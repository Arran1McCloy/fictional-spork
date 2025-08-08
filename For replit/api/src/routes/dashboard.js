import { Router } from 'express';
import pool from '../lib/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/counts', requireAuth, async (_req, res) => {
  try {
    const active = await pool.query(`SELECT COUNT(*)::int AS count FROM "defectData" WHERE status='active'`);
    const pending = await pool.query(`SELECT COUNT(*)::int AS count FROM "defectData" WHERE status='pending'`);
    const high = await pool.query(`SELECT COUNT(*)::int AS count FROM "defectData" WHERE status NOT IN('resolved (fixed)','resolved (irreparable)') AND urgency='high'`);
    res.json({ active: active.rows[0].count, pending: pending.rows[0].count, high_priority_open: high.rows[0].count });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/urgency-distribution', requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT urgency AS label, COUNT(*)::int AS count
      FROM "defectData"
      WHERE status NOT IN('resolved (fixed)','resolved (irreparable)','pending')
      GROUP BY urgency ORDER BY urgency
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/status-distribution', requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT status AS label, COUNT(*)::int AS count
      FROM "defectData"
      WHERE status NOT IN('resolved (fixed)')
      GROUP BY status ORDER BY status
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/work-hours', requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT title, current_hours, assigned_hours,
             (assigned_hours - current_hours) AS hours_left
      FROM "defectData"
      ORDER BY hours_left ASC
      LIMIT 50
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
