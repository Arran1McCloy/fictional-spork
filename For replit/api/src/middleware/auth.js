import jwt from 'jsonwebtoken';

export function signSession(payload) {
  const maxDays = parseInt(process.env.COOKIE_MAX_DAYS || '90', 10);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${maxDays}d` });
  return token;
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[process.env.COOKIE_NAME || 'sid'];
  if (!token) return res.status(401).json({ error: 'Unauthenticated' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }
}

export function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  }
}
