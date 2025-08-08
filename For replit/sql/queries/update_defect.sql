UPDATE "defectData" SET
  status=$1,
  urgency=$2,
  relevant_dept=$3,
  notes=$4,
  assigned_hours=$5,
  current_hours=$6,
  expected_completion=$7
WHERE job_id=$8
RETURNING *;
