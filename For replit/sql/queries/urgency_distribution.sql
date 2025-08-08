SELECT urgency, COUNT(*) AS count
  FROM "defectData"
 WHERE status NOT IN('resolved (fixed)','resolved (irreparable)','pending')
 GROUP BY urgency
 ORDER BY urgency;
