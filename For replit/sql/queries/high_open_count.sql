SELECT COUNT(*) AS count FROM "defectData" WHERE status NOT IN('resolved (fixed)','resolved (irreparable)') AND urgency='high';
