# Requirements

## Functional (by page)
### Login/Signup
- Login with `full_name`, `password`. Set session cookie (`sid`).

### Dashboard
- Show: Active count, Pending count, High-priority (open) count.
- Charts: Urgency distribution (active only), Status distribution (exclude 'resolved (fixed)'), Work hours table.

### Defect Log
- Table of defects with server-side filtering via `{field, op, vals}` (ops: `=`, `not in`).

### View Defect (Modal)
- Read-only fields, photos (0..3).

### Edit Defect (Modal)
- Required: `status`, `urgency`, `relevant_dept`.
- Optional: `notes`, `assigned_hours`, `current_hours`, `expected_completion`.

### New Report
- Required: `title`, `description`.
- Optional: `location`.
- `submitted_by` inferred from session `full_name`.
- `status` defaults to `pending`.

## Non-functional
- Auth: JWT httpOnly cookie, SameSite=Lax, 90d expiry.
- Max upload size: 6 MB per photo (jpg/png/webp). 3 slots.
- Errors: JSON with `error` string; 4xx for client errors; 5xx for server.
- Logging: Console for now.
- Performance: Server-side filtering & ordering for lists; target API TTFB < 500 ms in dev.

