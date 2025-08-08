import { Router } from 'express';
import pool from '../lib/db.js';

const router = Router();

router.get('/enums', async (_req, res) => {
  try {
    // Attempt to infer from DB content if present; fallback to hard-coded list
    const deps = await pool.query("SELECT DISTINCT department FROM users WHERE department IS NOT NULL ORDER BY department");
    const roles = await pool.query("SELECT DISTINCT role FROM users ORDER BY role");
    const statuses = await pool.query("SELECT DISTINCT status FROM "defectData" ORDER BY status");
    const urgencies = await pool.query("SELECT DISTINCT urgency FROM "defectData" ORDER BY urgency");
    res.json({
      department: deps.rows.map(r => r.department),
      role: roles.rows.map(r => r.role),
      status: statuses.rows.map(r => r.status),
      urgency: urgencies.rows.map(r => r.urgency)
    });
  } catch (e) {
    console.error(e);
    res.json({
      department: [], role: [], status: [], urgency: []
    });
  }
});

export default router;
