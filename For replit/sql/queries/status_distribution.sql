SELECT status, COUNT(*) AS count
  FROM "defectData"
 WHERE status NOT IN('resolved (fixed)')
 GROUP BY status
 ORDER BY status;
