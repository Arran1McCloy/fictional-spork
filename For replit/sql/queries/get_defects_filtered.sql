-- Input: {field, op, vals}
-- Example '=': field='status', vals=['active']       -> WHERE status='active'
-- Example 'not in': field='status', vals=['resolved (fixed)','resolved (irreparable)'] -> WHERE status NOT IN('resolved (fixed)','resolved (irreparable)')
-- When no filter -> WHERE TRUE
SELECT *
  FROM "defectData"
 WHERE /* dynamic WHERE here */
 ORDER BY created_at ASC;
