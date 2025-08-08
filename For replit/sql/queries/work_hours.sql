  SELECT title, current_hours, assigned_hours,
         (assigned_hours - current_hours) AS hours_left
    FROM "defectData"
ORDER BY hours_left ASC;
