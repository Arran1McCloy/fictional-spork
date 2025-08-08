# H&W Defect Tracking — Supabase-ready

Run locally with a Supabase Postgres (no Docker needed).

## Setup in Supabase
1. In Supabase SQL editor, run:
   - `CREATE EXTENSION IF NOT EXISTS pgcrypto;`
   - Paste `sql/schema.sql`
   - Paste `sql/seed.sql`

## Env
Create `.env` or `.env.supabase` with:
```
DATABASE_URL=postgresql://postgres:%5Bii-q8bGuwj-X-U3%5D@db.twdornyogryjhuakkoax.supabase.co:5432/postgres?sslmode=require
JWT_SECRET=change_me_in_prod
COOKIE_NAME=sid
COOKIE_MAX_DAYS=90
MAX_UPLOAD_MB=6
PORT_API=8080
VITE_API_BASE=http://localhost:8080
```

## Start
```bash
cd api && npm i && npm run dev
# new terminal
cd ../frontend && npm i && npm run dev
```
Open http://localhost:5173

## Notes
- Bcrypt in Node; session in httpOnly cookie (90d).
- RBAC: General cannot list/view/edit defects; Supervisor can list/edit.
