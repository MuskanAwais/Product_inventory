const statusEl = document.getElementById("status");
const categoryForm = document.getElementById("categoryForm");
const categoryList = document.getElementById("categoryList");
const categoryName = document.getElementById("categoryName");
const categoryDescription = document.getElementById("categoryDescription");

const productForm = document.getElementById("productForm");
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productQuantity = document.getElementById("productQuantity");
const productCategoryId = document.getElementById("productCategoryId");
const saveProductBtn = document.getElementById("saveProductBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const searchInput = document.getElementById("searchInput");
const productTableBody = document.getElementById("productTableBody");

// Same-origin API (UI + API both on http://localhost:5284)
const API_BASE = "";

let searchTimer = null;

function showStatus(message, isError = false) {
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function setBusy(form, busy) {
  form.querySelectorAll("button, input, select").forEach((el) => {
    if (el.id === "cancelEditBtn" && cancelEditBtn.hidden) return;
    el.disabled = busy;
  });
}

async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach API. Is the server running?");
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

async function loadCategories() {
  const categories = await api("/api/categories");

  categoryList.innerHTML = categories.length
    ? categories
        .map(
          (c) =>
            `<li><strong>${escapeHtml(c.name)}</strong>${
              c.description ? `<br><small>${escapeHtml(c.description)}</small>` : ""
            }</li>`
        )
        .join("")
    : "<li>No categories yet.</li>";

  const previous = productCategoryId.value;
  productCategoryId.innerHTML = categories.length
    ? categories
        .map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`)
        .join("")
    : `<option value="">Add a category first</option>`;

  if (previous && [...productCategoryId.options].some((o) => o.value === previous)) {
    productCategoryId.value = previous;
  }
}

async function loadProducts(search = "") {
  productTableBody.innerHTML = `<tr><td colspan="5">Loading...</td></tr>`;
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const products = await api(`/api/products${query}`);

  if (!products.length) {
    productTableBody.innerHTML = `<tr><td colspan="5">No products found.</td></tr>`;
    return;
  }

  productTableBody.innerHTML = products
    .map(
      (p) => `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.categoryName)}</td>
        <td>${Number(p.price).toFixed(2)}</td>
        <td>${p.quantity}</td>
        <td class="actions">
          <button type="button" data-edit='${encodeURIComponent(JSON.stringify(p))}'>Edit</button>
          <button type="button" class="danger" data-delete="${p.id}">Delete</button>
        </td>
      </tr>`
    )
    .join("");
}

function resetProductForm() {
  productForm.reset();
  productId.value = "";
  saveProductBtn.textContent = "Add Product";
  cancelEditBtn.hidden = true;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

categoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  setBusy(categoryForm, true);
  try {
    await api("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name: categoryName.value.trim(),
        description: categoryDescription.value.trim() || null,
      }),
    });
    categoryForm.reset();
    showStatus("Category added.");
    await loadCategories();
  } catch (err) {
    showStatus(err.message, true);
  } finally {
    setBusy(categoryForm, false);
  }
});

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!productCategoryId.value) {
    showStatus("Add a category first.", true);
    return;
  }

  const payload = {
    name: productName.value.trim(),
    description: productDescription.value.trim() || null,
    price: Number(productPrice.value),
    quantity: Number(productQuantity.value),
    categoryId: Number(productCategoryId.value),
  };

  setBusy(productForm, true);
  try {
    if (productId.value) {
      await api(`/api/products/${productId.value}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      showStatus("Product updated.");
    } else {
      await api("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showStatus("Product added.");
    }
    resetProductForm();
    await loadProducts(searchInput.value.trim());
  } catch (err) {
    showStatus(err.message, true);
  } finally {
    setBusy(productForm, false);
  }
});

cancelEditBtn.addEventListener("click", () => {
  resetProductForm();
});

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    loadProducts(searchInput.value.trim()).catch((err) => showStatus(err.message, true));
  }, 300);
});

productTableBody.addEventListener("click", async (e) => {
  const editBtn = e.target.closest("[data-edit]");
  const deleteBtn = e.target.closest("[data-delete]");

  if (editBtn) {
    const product = JSON.parse(decodeURIComponent(editBtn.dataset.edit));
    productId.value = product.id;
    productName.value = product.name;
    productDescription.value = product.description || "";
    productPrice.value = product.price;
    productQuantity.value = product.quantity;
    productCategoryId.value = String(product.categoryId);
    saveProductBtn.textContent = "Update Product";
    cancelEditBtn.hidden = false;
    return;
  }

  if (deleteBtn) {
    const id = deleteBtn.dataset.delete;
    if (!confirm("Delete this product?")) return;
    deleteBtn.disabled = true;
    try {
      await api(`/api/products/${id}`, { method: "DELETE" });
      showStatus("Product deleted.");
      if (productId.value === String(id)) resetProductForm();
      await loadProducts(searchInput.value.trim());
    } catch (err) {
      showStatus(err.message, true);
      deleteBtn.disabled = false;
    }
  }
});

async function init() {
  showStatus("Connecting to API...");
  try {
    await loadCategories();
    await loadProducts();
    showStatus("Connected. UI is talking to the API.");
  } catch (err) {
    showStatus(err.message, true);
  }
}

init();
