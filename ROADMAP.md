# Product Inventory — Step-by-Step Development Roadmap

> **Project:** Product Inventory (ASP.NET Core Web API + EF Core + SQL Server + React)  
> **Level:** Beginner-friendly  
> **Rule:** Finish one phase fully before starting the next. Ask for code only when you start that phase.

---

## How to Use This Roadmap

1. Read the phase goal and “what you will learn.”
2. Complete every item in **Deliverables**.
3. Check **Expected output**.
4. Only then move on.
5. Say: *“Let’s do Phase X”* when you want help implementing that phase.

---

## Project Snapshot

| Item | Decision |
|------|----------|
| **App** | Product Inventory — manage products and categories |
| **Backend** | ASP.NET Core Web API (.NET 8) |
| **Database** | SQL Server + Entity Framework Core |
| **Frontend** | React (Vite) |
| **Architecture** | Controllers → Services → DbContext (simple & clear) |
| **Deploy** | API (Azure/Render) + UI (Vercel/Netlify) + Azure SQL |

### What the app does

- Create, read, update, delete **products**
- Create and list **categories**
- Search products by name
- Show price, quantity (stock), and category

### Must-have features (v1)

1. Product list with category name  
2. Add product  
3. Edit product  
4. Delete product (with confirmation)  
5. Search by product name  
6. List categories + add category  

### Out of scope for v1 (keep it simple)

- Login / authentication  
- Pagination  
- Orders / checkout  
- Soft delete  

---

## Final Folder Structure (Target)

```
ProductInventory/
├── ROADMAP.md
├── README.md
├── ProductInventory.sln
├── src/
│   └── ProductInventory.Api/
│       ├── Controllers/
│       ├── DTOs/
│       ├── Services/
│       ├── Entities/
│       ├── Data/
│       ├── Migrations/
│       ├── Program.cs
│       └── appsettings.json
└── client/                    ← React (Vite)
    ├── src/
    │   ├── api/
    │   ├── pages/
    │   ├── components/
    │   └── styles/
    └── package.json
```

---

# Phases

---

## Phase 1 — Project Planning

### Goal
Lock scope, features, API list, and database idea on paper before coding.

### What you will learn
- How to define a small product clearly
- How to write an API endpoint list
- How to avoid building too much

### Why it matters
Clear scope = finishable demo for learning and assessment.

### Files / folders
- Notes only (optional later: `docs/planning.md`)

### Deliverables
- [ ] Confirm app name: **Product Inventory**
- [ ] Confirm must-have features (list above)
- [ ] Confirm tech stack
- [ ] Write API endpoint table
- [ ] Sketch tables: `Categories`, `Products`

### API plan

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create category |
| GET | `/api/products` | List / search products |
| GET | `/api/products/{id}` | Get one product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Expected output
A one-page plan you can explain in 2 minutes.

### Next phase unlock
Plan is written and agreed.

**Time:** 0.5–1 day

---

## Phase 2 — Environment Setup

### Goal
Install tools and run an empty Web API successfully.

### What you will learn
- .NET SDK, SQL Server, Git, Node.js
- Creating a solution and Web API project
- Opening Swagger

### Why it matters
A working empty API proves your machine is ready.

### Files / folders created
```
ProductInventory/
├── ProductInventory.sln
└── src/ProductInventory.Api/
```

### Deliverables
- [ ] Install .NET 8 SDK  
- [ ] Install VS 2022 or VS Code + C#  
- [ ] Install SQL Server LocalDB/Express  
- [ ] Install Git + Node.js LTS  
- [ ] Create solution + Web API project  
- [ ] Run API → Swagger opens  

### Expected output
Swagger loads; default sample endpoint works.

### Next phase unlock
API runs with no setup errors.

**Time:** 0.5–1 day

---

## Phase 3 — Understand Project Structure

### Goal
Know what each important file does before writing business code.

### What you will learn
Request flow: HTTP → Controller → Service → Database

### Why it matters
You can debug and explain the project like an engineer.

### Key files

| File / folder | Purpose |
|---------------|---------|
| `.sln` | Groups projects |
| `.csproj` | Packages + framework version |
| `Program.cs` | Startup, DI, middleware, routes |
| `appsettings.json` | Config + connection string |
| `launchSettings.json` | Local ports / HTTPS |
| `Controllers/` | API endpoints |
| `Entities/` | Tables as C# classes |
| `DTOs/` | Request/response shapes |
| `Data/` | `DbContext` |
| `Services/` | Business logic |
| `Migrations/` | Database change history |

### Deliverables
- [ ] Explain each row above in one sentence  
- [ ] Draw the request flow on paper  

### Expected output
You understand the skeleton — no new features yet.

### Next phase unlock
You can explain `Program.cs` and `appsettings.json`.

**Time:** 0.5 day

---

## Phase 4 — Database Design

### Goal
Design `Categories` and `Products` correctly.

### What you will learn
Primary keys, foreign keys, one-to-many relationship

### Why it matters
Good schema makes EF Core and APIs easy.

### ER diagram

```
Categories (1) ──────── (*) Products

Categories
- Id (PK, int)
- Name (required)
- Description (optional)

Products
- Id (PK, int)
- Name (required)
- Description (optional)
- Price (decimal, >= 0)
- Quantity (int, >= 0)
- CategoryId (FK → Categories.Id)
- CreatedAt (datetime)
```

### Deliverables
- [ ] Understand 1 Category → many Products  
- [ ] Finalize column names and types  

### Expected output
Fixed schema — no renaming mid-project.

### Next phase unlock
Schema is locked.

**Time:** 0.5 day

---

## Phase 5 — Entity Framework Core

### Goal
Connect SQL Server and create real tables with migrations.

### What you will learn
`DbContext`, `DbSet`, connection string, migrations, update database

### Why it matters
This is how C# models become SQL tables.

### Files / folders
```
src/ProductInventory.Api/
├── Entities/Category.cs
├── Entities/Product.cs
├── Data/AppDbContext.cs
├── Migrations/
└── appsettings.Development.json
```

### Deliverables
- [ ] Entity classes created  
- [ ] `AppDbContext` registered  
- [ ] Connection string set  
- [ ] Migration created  
- [ ] Database updated  
- [ ] Tables visible in SQL tool  

### Expected output
Empty `Categories` and `Products` tables exist.

### Next phase unlock
DB updates without errors.

**Time:** 1 day

---

## Phase 6 — Backend CRUD APIs

### Goal
Build working product & category APIs with validation.

### What you will learn
Controllers, DTOs, services, status codes, Swagger testing

### Why it matters
Core of the assessment — API should work even without UI.

### Files / folders
```
Controllers/ProductsController.cs
Controllers/CategoriesController.cs
DTOs/...
Services/ProductService.cs
Services/CategoryService.cs
```

### Implement
- Categories: GET all, POST create  
- Products: full CRUD + `?search=`  
- Validation: name required; price/quantity >= 0  
- Errors: 404 not found; 400 bad input  

### Deliverables
- [ ] All endpoints work in Swagger  
- [ ] Create category → create product with that category  
- [ ] Update + delete tested  
- [ ] Search works  

### Expected output
Full backend demo via Swagger only.

### Next phase unlock
Backend stable and tested.

**Time:** 2–3 days

---

## Phase 7 — Frontend (React + Vite)

### Goal
Build a simple, clean UI for inventory screens.

### What you will learn
React pages, forms, loading and error UI

### Why it matters
You need a visible demo, not only JSON.

### Files / folders
```
client/
├── src/api/client.js
├── src/pages/ProductList.jsx
├── src/pages/ProductForm.jsx
├── src/pages/CategoryList.jsx
├── src/components/Navbar.jsx
├── src/components/Loading.jsx
├── src/components/ConfirmDialog.jsx
└── .env.example
```

### Screens
| Screen | Purpose |
|--------|---------|
| Product list | Table + search + actions |
| Add / Edit form | Name, price, qty, category |
| Delete confirm | Prevent accidents |
| Categories | Simple list + add |
| Loading / errors | Basic UX |

### Deliverables
- [ ] Vite app runs locally  
- [ ] Pages and components exist  
- [ ] Forms have basic client validation  

### Expected output
UI shell ready (API wiring next phase if needed).

### Next phase unlock
Pages exist; API base URL placeholder ready.

**Time:** 2–3 days

---

## Phase 8 — Connect Frontend ↔ Backend

### Goal
Make the React app use the real API end-to-end.

### What you will learn
CORS, env variables, success/error handling in UI

### Why it matters
This is the full-stack demo moment.

### Do this
1. Enable CORS for React origin  
2. Set `VITE_API_BASE_URL`  
3. Wire list / create / update / delete / search  
4. Show loading + success/error messages  

### Deliverables
- [ ] Full CRUD from browser  
- [ ] Search from UI  
- [ ] CORS works  
- [ ] Loading states work  

### Expected output
Local end-to-end demo: UI ↔ API ↔ SQL Server.

### Next phase unlock
Happy path works on your machine.

**Time:** 1–2 days

---

## Phase 9 — Git & GitHub

### Goal
Publish clean source on GitHub.

### What you will learn
`.gitignore`, meaningful commits, simple branches

### Why it matters
Assessments are often reviewed on GitHub.

### Example commits
```
chore: create api solution
feat: add entities and ef migration
feat: implement product and category apis
feat: add react inventory ui
fix: configure cors for vite
docs: add readme
```

### Deliverables
- [ ] Repo created  
- [ ] Secrets not committed  
- [ ] Code pushed to `main`  
- [ ] Clean commit messages  

### Expected output
Fresh clone is possible (setup steps in Phase 11).

### Next phase unlock
Repo clean; no passwords in Git.

**Time:** 0.5–1 day

---

## Phase 10 — Deployment

### Goal
Put API + UI online with a cloud database.

### What you will learn
Build, env vars, production connection string, production CORS

### Easy deploy path

```
React (Vercel / Netlify)
        ↓
ASP.NET API (Azure App Service / Render)
        ↓
Azure SQL
```

### Deliverables
- [ ] DB hosted  
- [ ] API deployed + connection string set  
- [ ] Frontend deployed + API URL set  
- [ ] CORS allows live frontend  
- [ ] Live CRUD tested  

### Expected output
Two live URLs; full CRUD works online.

### Next phase unlock
Live demo works.

**Time:** 1–2 days

---

## Phase 11 — Documentation

### Goal
Write a professional README for reviewers.

### What you will learn
How to document setup, API, and architecture clearly

### README must include
- Description + features  
- Tech stack  
- Project structure  
- Local run steps (API + DB + React)  
- Environment variables  
- API endpoint table  
- Screenshots  
- Live demo links  
- Future improvements  

### Deliverables
- [ ] Root `README.md` complete  
- [ ] Screenshots added  
- [ ] Someone else could run it from README  

### Expected output
Project is presentable for assessment/interview.

### Done when
You can demo and explain the whole app in 5–10 minutes.

**Time:** 0.5–1 day

---

# Timeline

| Phase | Focus | Part-time | Focused |
|-------|--------|-----------|---------|
| 1 | Planning | 0.5–1 day | 0.5 day |
| 2 | Environment | 0.5–1 day | 0.5 day |
| 3 | Structure | 0.5 day | 0.5 day |
| 4 | DB design | 0.5 day | 0.5 day |
| 5 | EF Core | 1 day | 0.5–1 day |
| 6 | Backend APIs | 2–3 days | 1–2 days |
| 7 | React UI | 2–3 days | 1–2 days |
| 8 | Connect FE/BE | 1–2 days | 1 day |
| 9 | GitHub | 0.5–1 day | 0.5 day |
| 10 | Deploy | 1–2 days | 1 day |
| 11 | README | 0.5–1 day | 0.5 day |
| **Total** | | **~10–16 days** | **~7–10 days** |

**Practical target:** ~2 weeks at a steady pace.

---

# Progress Tracker

Use this as you go:

- [ ] Phase 1 — Planning  
- [ ] Phase 2 — Environment setup  
- [ ] Phase 3 — Understand structure  
- [ ] Phase 4 — Database design  
- [ ] Phase 5 — EF Core  
- [ ] Phase 6 — Backend CRUD  
- [ ] Phase 7 — React UI  
- [ ] Phase 8 — Connect frontend & backend  
- [ ] Phase 9 — Git & GitHub  
- [ ] Phase 10 — Deployment  
- [ ] Phase 11 — Documentation  

---

# Next Step

Say **“Let’s do Phase 1”** and we’ll finalize the Product Inventory plan together (features, API list, schema) — still without jumping into full implementation until you’re ready.
