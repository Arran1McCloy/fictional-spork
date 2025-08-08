import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import defectRoutes from './routes/defects.js';
import dashboardRoutes from './routes/dashboard.js';
import metaRoutes from './routes/meta.js';
import photosRoutes from './routes/photos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT_API || 8080;
const ORIGIN = process.env.VITE_API_BASE?.replace(/:\\d+$/, '') || 'http://localhost:5173';

app.use(express.json({ limit: `${process.env.MAX_UPLOAD_MB || 6}mb` }));
app.use(cookieParser());
app.use(cors({ origin: ORIGIN, credentials: true }));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/meta', metaRoutes);
app.use('/defects', defectRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/defects', photosRoutes); // merges /:id/photos

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
