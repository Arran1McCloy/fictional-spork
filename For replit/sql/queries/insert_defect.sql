INSERT INTO "defectData"(title, description, status, submitted_by, location, created_at)
VALUES ($1, $2, 'pending', $3, $4, CURRENT_DATE)
RETURNING *;
