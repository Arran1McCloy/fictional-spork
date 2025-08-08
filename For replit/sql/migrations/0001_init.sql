BEGIN;

-- If you use crypt() for password checks
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- TABLE: public.users
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
  user_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name  TEXT UNIQUE,
  department department,                 -- enum type (already defined in DB)
  password   TEXT,                       -- bcrypt hash (stored)
  role       role NOT NULL DEFAULT 'General'::role,  -- enum type, default as in your DB
  email      TEXT
);

-- Helpful indexes for typical filters
CREATE INDEX IF NOT EXISTS idx_users_department ON public.users (department);
CREATE INDEX IF NOT EXISTS idx_users_role       ON public.users (role);

-- =====================================================
-- TABLE: public."defectData"
-- (keep the camelCase identifier quoted to match your DB)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."defectData" (
  job_id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at           DATE NOT NULL,
  title                TEXT DEFAULT ''::text,
  description          TEXT,
  status               status,           -- enum type (already defined)
  urgency              urgency,          -- enum type (already defined)
  assigned_hours       BIGINT,
  current_hours        BIGINT,
  assigned_to          TEXT,
  submitted_by         TEXT,             -- matches your current DB (not FK)
  expected_completion  DATE,
  location             TEXT,
  relevant_dept        department,       -- enum type (already defined)
  notes                TEXT,
  hse                  BOOLEAN NOT NULL DEFAULT FALSE,
  coords               JSONB
);

-- Indexes used by your app’s filters/sorts
CREATE INDEX IF NOT EXISTS idx_defectdata_status        ON public."defectData" (status);
CREATE INDEX IF NOT EXISTS idx_defectdata_urgency       ON public."defectData" (urgency);
CREATE INDEX IF NOT EXISTS idx_defectdata_created_at    ON public."defectData" (created_at);
CREATE INDEX IF NOT EXISTS idx_defectdata_relevant_dept ON public."defectData" (relevant_dept);

-- =====================================================
-- TABLE: public.photos
-- =====================================================
CREATE TABLE IF NOT EXISTS public.photos (
  photo_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  added_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  photo_data1  TEXT,
  job_id       BIGINT UNIQUE,
  photo_data2  TEXT,
  photo_data3  TEXT,
  CONSTRAINT photos_job_id_fkey
    FOREIGN KEY (job_id)
    REFERENCES public."defectData"(job_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- (UNIQUE on job_id already provides an index for upserts)

COMMIT;
