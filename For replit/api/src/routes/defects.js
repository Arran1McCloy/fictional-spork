import { Router } from 'express';
import pool from '../lib/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/auth.js';
import { Roles } from '../middleware/rbac.js';

const router = Router();

function buildWhere(field, op, vals) {
  if (!field || !op || !vals || !vals.length) return 'true';
  if (op === '=') {
    return `${field} = ${pool.escapeLiteral ? pool.escapeLiteral(vals[0]) : `'${vals[0].replace(/'/g, "''")}'`}`;
  }
  if (op === 'not in') {
    const list = vals.map(v => `'${v.replace(/'/g, "''")}'`).join(',');
    return `${field} NOT IN (${list})`;
  }
  return 'true';
}

router.get('/', requireAuth, requireRole([Roles.Supervisor, Roles.HSE, Roles.Other]), async (req, res) => {
  const { field, op } = req.query;
  const vals = Array.isArray(req.query.vals) ? req.query.vals : (req.query.vals ? [req.query.vals] : []);
  const where = buildWhere(field, op, vals);
  try {
    const { rows } = await pool.query(`SELECT * FROM "defectData" WHERE ${where} ORDER BY created_at ASC`);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  const { title, description, location = null } = req.body || {};
  if (!title || !description) return res.status(400).json({ error: 'title and description required' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO "defectData"(title, description, status, submitted_by, location, created_at)
       VALUES ($1, $2, 'pending', $3, $4, CURRENT_DATE)
       RETURNING *`,
      [title, description, req.user.full_name, location]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', requireAuth, requireRole([Roles.Supervisor, Roles.HSE, Roles.Other]), async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM "defectData" WHERE job_id=$1`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', requireAuth, requireRole([Roles.Supervisor]), async (req, res) => {
  const { status, urgency, relevant_dept } = req.body || {};
  if (!status || !urgency || !relevant_dept) {
    return res.status(400).json({ error: 'status, urgency, relevant_dept required' });
  }
  const fields = ['notes','assigned_hours','current_hours','expected_completion'];
  const sets = ['status','urgency','relevant_dept'];
  const values = [status, urgency, relevant_dept];
  let i = 4;
  for (const f of fields) {
    if (f in req.body) {
      sets.push(f);
      values.push(req.body[f]);
    }
  }
  const setClause = sets.map((f, idx) => `${f}=$${idx+1}`).join(', ');
  try {
    const { rows } = await pool.query(
      `UPDATE "defectData" SET ${setClause} WHERE job_id=$${sets.length+1} RETURNING *`,
      [...values, req.params.id]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
