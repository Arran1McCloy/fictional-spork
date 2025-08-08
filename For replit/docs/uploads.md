# Uploads

- **Format**: Base64 strings in `photos.photo_data1..3`.
- **Limits**: jpg/png/webp; ≤ 6 MB each.
- **Upsert**: POST `/defects/{id}/photos` replaces only fields provided (COALESCE to keep existing).
- **Delete**: Send `photo_dataN: null` to clear a slot.
- **Display**: View modal shows up to 3 images if present.
- **Errors**: 400 for invalid mime/oversize; 404 if `job_id` not found.

