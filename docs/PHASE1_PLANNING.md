# Phase 1 — Product Inventory Planning Worksheet

> Fill this yourself. No coding in this phase.  
> When every checkbox is done, say: **“Phase 1 done — start Phase 2”**

---

## Step 1 — Confirm the project (5 minutes)

Write your answers below (or just tick if you agree).

- [ ] App name: **Product Inventory**
- [ ] Purpose (one sentence): ________________________________

Suggested purpose (you can copy this):
> A simple system to manage store products and categories with full create, read, update, and delete.

---

## Step 2 — Confirm tech stack (5 minutes)

Tick only if you understand what each piece is for:

| Layer | Choice | Your understanding (1 line) | Done |
|-------|--------|-----------------------------|------|
| Backend | ASP.NET Core Web API (.NET 8) | _________________________ | [ ] |
| ORM | Entity Framework Core | _________________________ | [ ] |
| Database | SQL Server | _________________________ | [ ] |
| Frontend | React (Vite) | _________________________ | [ ] |
| Git | Git + GitHub | _________________________ | [ ] |

**Quick meanings (read, don’t memorize):**
- **Web API** = backend that returns JSON over HTTP  
- **EF Core** = C# talks to SQL Server without writing raw SQL for basic CRUD  
- **SQL Server** = where Categories and Products are stored  
- **React** = website UI that calls your API  
- **GitHub** = online copy of your code  

---

## Step 3 — Must-have features (10 minutes)

Tick what you will build in v1. Do **not** add extra features yet.

- [ ] List products (show name, price, quantity, category)
- [ ] Add product
- [ ] Edit product
- [ ] Delete product (with confirmation in UI later)
- [ ] Search products by name
- [ ] List categories
- [ ] Add category

**Out of scope for v1 (do not build now):**
- [ ] I understand: no login, no pagination, no orders, no soft delete

---

## Step 4 — Database sketch (15 minutes)

### Tables

**Categories**

| Column | Type | Required? | Notes |
|--------|------|-----------|-------|
| Id | int | yes | Primary key, auto number |
| Name | string (max 100) | yes | e.g. Electronics, Food |
| Description | string (max 500) | no | optional |

**Products**

| Column | Type | Required? | Notes |
|--------|------|-----------|-------|
| Id | int | yes | Primary key, auto number |
| Name | string (max 150) | yes | product name |
| Description | string (max 1000) | no | optional |
| Price | decimal | yes | >= 0 |
| Quantity | int | yes | stock count, >= 0 |
| CategoryId | int | yes | Foreign key → Categories.Id |
| CreatedAt | datetime | yes | set when product is created |

### Relationship (tick when clear)

- [ ] One **Category** can have many **Products**
- [ ] Each **Product** belongs to one **Category**
- [ ] `CategoryId` links Product → Category

### Sample data (write 2–3 examples so the design feels real)

**Categories**
1. __________________  
2. __________________  

**Products**
1. Name: __________ | Price: ____ | Qty: ____ | Category: __________  
2. Name: __________ | Price: ____ | Qty: ____ | Category: __________  
3. Name: __________ | Price: ____ | Qty: ____ | Category: __________  

---

## Step 5 — API endpoint list (15 minutes)

Copy this into your notes and tick when you understand each row.

| Method | Endpoint | What it does | Body needed? | Done |
|--------|----------|--------------|--------------|------|
| GET | `/api/categories` | Get all categories | No | [ ] |
| POST | `/api/categories` | Create category | Yes: Name, Description | [ ] |
| GET | `/api/products` | Get all products (optional `?search=phone`) | No | [ ] |
| GET | `/api/products/{id}` | Get one product by id | No | [ ] |
| POST | `/api/products` | Create product | Yes: Name, Price, Quantity, CategoryId… | [ ] |
| PUT | `/api/products/{id}` | Update product | Yes: same fields as create | [ ] |
| DELETE | `/api/products/{id}` | Delete product | No | [ ] |

**HTTP method meanings:**
- **GET** = read data  
- **POST** = create new data  
- **PUT** = update existing data  
- **DELETE** = remove data  

---

## Step 6 — Folder structure target (5 minutes)

You will create this in later phases. For now, only confirm you understand it:

```
ProductInventory/
├── ROADMAP.md
├── README.md                 ← Phase 11
├── ProductInventory.sln      ← Phase 2
├── src/
│   └── ProductInventory.Api/ ← Phase 2–6 (backend)
└── client/                   ← Phase 7–8 (React)
```

- [ ] I know backend code will live in `src/ProductInventory.Api`
- [ ] I know React UI will live in `client`
- [ ] I will not create these folders yet (unless I want empty placeholders)

---

## Step 7 — Phase 1 self-check (5 minutes)

Answer in your own words (1–2 lines each):

1. What problem does Product Inventory solve?  
   _______________________________________________

2. What are the two database tables?  
   _______________________________________________

3. What does CRUD mean for Products?  
   _______________________________________________

4. Which frontend will you use and why (simple answer)?  
   _______________________________________________

5. What will you NOT build in v1?  
   _______________________________________________

---

## Phase 1 complete when

- [ ] All steps above are filled / ticked  
- [ ] You can explain the project in ~2 minutes without looking  
- [ ] You did **not** write ASP.NET or React code yet  

**Then message:** `Phase 1 done — start Phase 2`
