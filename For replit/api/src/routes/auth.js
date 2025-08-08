import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../lib/db.js';
import { signSession } from '../middleware/auth.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { full_name, password, role, department = null, email = null } = req.body || {};
  if (!full_name || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await pool.query(
      `INSERT INTO users(full_name,password,role,department,email)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT(full_name) DO NOTHING
       RETURNING user_id,full_name,role,department,email`,
      [full_name, hash, role, department, email]
    );
    if (!rows.length) return res.status(409).json({ error: 'Name taken' });
    const user = rows[0];
    const token = signSession(user);
    res.cookie(process.env.COOKIE_NAME || 'sid', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: (parseInt(process.env.COOKIE_MAX_DAYS || '90', 10)) * 24 * 60 * 60 * 1000
    });
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { full_name, password } = req.body || {};
  if (!full_name || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const { rows } = await pool.query(
      `SELECT user_id, full_name, department, role, password FROM users WHERE full_name=$1`,
      [full_name]
    );
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const payload = { user_id: user.user_id, full_name: user.full_name, department: user.department, role: user.role };
    const token = signSession(payload);
    res.cookie(process.env.COOKIE_NAME || 'sid', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: (parseInt(process.env.COOKIE_MAX_DAYS || '90', 10)) * 24 * 60 * 60 * 1000
    });
    res.json(payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', async (_req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'sid');
  res.status(204).end();
});

router.get('/me', async (req, res) => {
  const token = req.cookies?.[process.env.COOKIE_NAME || 'sid'];
  if (!token) return res.status(200).json(null);
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    res.json(payload);
  } catch {
    res.json(null);
  }
});

export default router;
