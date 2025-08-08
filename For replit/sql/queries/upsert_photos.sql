INSERT INTO photos(job_id, photo_data1, photo_data2, photo_data3)
VALUES ($1,$2,$3,$4)
ON CONFLICT (job_id) DO UPDATE
  SET photo_data1=COALESCE(EXCLUDED.photo_data1, photos.photo_data1),
      photo_data2=COALESCE(EXCLUDED.photo_data2, photos.photo_data2),
      photo_data3=COALESCE(EXCLUDED.photo_data3, photos.photo_data3)
RETURNING photo_data1, photo_data2, photo_data3;
