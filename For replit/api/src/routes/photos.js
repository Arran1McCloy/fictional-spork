import { Router } from 'express';
import pool from '../lib/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/auth.js';
import { Roles } from '../middleware/rbac.js';

const router = Router();

router.get('/:id/photos', requireAuth, requireRole([Roles.Supervisor, Roles.HSE, Roles.Other]), async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT photo_data1, photo_data2, photo_data3 FROM photos WHERE job_id=$1`, [req.params.id]);
    res.json(rows[0] || { photo_data1: null, photo_data2: null, photo_data3: null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/photos', requireAuth, async (req, res) => {
  const { photo_data1=null, photo_data2=null, photo_data3=null } = req.body || {};
  try {
    const { rows } = await pool.query(
      `INSERT INTO photos(job_id, photo_data1, photo_data2, photo_data3)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (job_id) DO UPDATE
         SET photo_data1=COALESCE(EXCLUDED.photo_data1, photos.photo_data1),
             photo_data2=COALESCE(EXCLUDED.photo_data2, photos.photo_data2),
             photo_data3=COALESCE(EXCLUDED.photo_data3, photos.photo_data3)
       RETURNING photo_data1, photo_data2, photo_data3`,
      [req.params.id, photo_data1, photo_data2, photo_data3]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
