# H&W Defect Tracking — Scaffold

This repository is a starting point for migrating the Appsmith app to a full-stack codebase.

## Tech
- **Frontend**: React + Vite + TypeScript, Zustand, ECharts
- **Backend**: Node + Express + pg, bcrypt, JWT (httpOnly cookie, 90d)
- **DB**: PostgreSQL 15 (Docker), schema from `sql/schema.sql` (your supplied schema)
- **Uploads**: base64 inline in `photos.photo_dataN` (for now)

## Run (dev)
1. Start Postgres:
   ```bash
   docker compose up -d
   ```
2. Create schema & seed:
   ```bash
   psql postgres://postgres:postgres@localhost:5432/hw_defects -f sql/schema.sql
   psql postgres://postgres:postgres@localhost:5432/hw_defects -f sql/seed.sql
   ```
3. Backend:
   ```bash
   cd api
   npm install
   npm run dev
   ```
4. Frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Golden Checks
The seed produces known dashboard numbers. A verify script will be added to assert these via API responses.

## Notes
- `submitted_by` remains TEXT full_name, matching the current Appsmith logic.
- Phase-1 notifications are **deferred**; hook points will exist in the backend.


## Summary
Mobile/web app to report, track, and analyze facility defects. Users create reports with photos; supervisors manage status/urgency/department; dashboard shows live stats and charts.

## Guardrails
- TypeScript on (frontend).
- Libraries: React Router, Zustand, Axios, ECharts.
- Security: bcrypt for passwords; JWT in httpOnly cookie only.
- Data: Enum fields are TEXT (values from DB).

## Pages & Routes
- `/dashboard`, `/defects`, `/defects/:id`, `/defects/:id/edit`, `/new`, `/login`, `/success`

## See Also
- `docs/architecture.md`, `docs/requirements.md`, `docs/auth.md`, `docs/uploads.md`, `docs/rbac.md`, `docs/migration_map.md`, `docs/filtering.md`
- `docs/ui/forms.md`, `docs/ui/flows.md`, `docs/ui/components.md`
- `tests/postman/collection.json`, `tests/sql/golden.md`


## Verify (golden checks + RBAC)
In a separate terminal (API must be running):
```bash
node scripts/verify.mjs
```
You should see all ✅ for counts, distributions, and RBAC rules.
