# Authentication

- **Choice**: bcrypt in Node.js (hash at signup; compare at login).
- **Session**: JWT in httpOnly cookie (`sid`), SameSite=Lax, expiry 90 days.
- **Payload**: `{ user_id, full_name, department, role }`
- **Guards**:
  - Backend: `requireAuth` for protected routes; `requireRole([...])` for role-restricted actions.
  - Frontend: route-level protection; redirect unauthenticated to `/login`.

