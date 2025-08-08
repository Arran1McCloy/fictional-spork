**Goal:** Generate a full‑stack clone of the H&W Defect‑Tracking App using the contracts in `/api/openapi.yaml`, DB in `/sql`, and UI specs in `/docs/ui`.

**Do:**
1) Scaffold `backend/` (Express + `pg`) that **conforms to OpenAPI** and passes `/tests/postman/collection.json`.
2) Scaffold `frontend/` (React+Vite+TS) with routes in README and state replacing `appsmith.store`.
3) Implement pages/forms exactly as `/docs/ui/forms.md` with ECharts options from `/docs/ui/components.md`.
4) Implement RBAC per `/docs/rbac.md`.
5) Use env from `.env.example`.
6) Wire seeds and ensure dashboard numbers match `/tests/sql/golden.md`.

**Don’t:** invent endpoints, change schema, or skip tests.

**Deliver:** runnable `npm run dev` for both apps and note any gaps in `/docs/gaps.md`.
