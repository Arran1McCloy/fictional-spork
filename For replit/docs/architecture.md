# Architecture

**Frontend (React + Vite + TS)** ↔ **API (Express + pg)** ↔ **PostgreSQL 15 (Docker)**

## Data Flow
- **Auth**: Login sets httpOnly JWT cookie (`sid`, 90 days). Frontend reads `/auth/me` for session.
- **State**: `Zustand` replaces `appsmith.store`:
  - `user`: `{ user_id, full_name, department, role }`
  - `defectFilter`: `{ field, op, vals }`
- **Uploads**: Base64 blobs written to `photos.photo_data1..3`. Max 6 MB each; jpg/png/webp.

```text
[React UI] --fetch--> [/api/*] --SQL--> [Postgres]
    ^                                        |
    |--- ECharts options <-- dashboard JSON --|
```

## Pages & Routes
- `/dashboard`, `/defects`, `/defects/:id`, `/defects/:id/edit`, `/new`, `/login`, `/success`

