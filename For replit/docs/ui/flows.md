# UI Flows (draft)

Derived from the provided tutorials:
- `Signing up and creating a defect report.pptx`
- `Using the dashboard and managing defects.pptx`

## Flow A — Signup → New Defect → Success
1. Open `/login` → switch to Signup.
2. Enter `full_name`, `password`, select `role` (+ optional dept/email) → Submit.
3. Redirect to `/new` (if role General) or `/dashboard` (others).
4. Fill **title** + **description** (+ optional location) → Create.
5. (Optional) Upload photos to the created defect via `/defects/{id}/photos`.
6. Redirect to `/success`.

## Flow B — Dashboard → Defect Log → View → Edit
1. `/dashboard`: stat cards and charts.
2. Click-through to `/defects` with a preset filter (e.g., Active).
3. Open a row to `/defects/{id}` (view modal).
4. From view, go to `/defects/{id}/edit`.
5. Update **status**, **urgency**, **relevant_dept** (+ optional fields) → Save.

> Screenshots from the PPTs can be added under `/docs/ui/screens/*` later.
