-- Enable hashing for seed inserts (matches your login via crypt())
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clean slate (optional in dev)
TRUNCATE TABLE photos RESTART IDENTITY CASCADE;
TRUNCATE TABLE "defectData" RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- USERS (enum role, enum department)
-- Password for all below = 'pass123' (dev only)
INSERT INTO users (full_name, password, role, department, email)
VALUES
('Alice Smith',  crypt('pass123', gen_salt('bf')), 'General',    'Operations',            'alice@example.com'),
('Bob Jones',    crypt('pass123', gen_salt('bf')), 'Supervisor', 'Mechanical Fitter',     'bob@example.com'),
('Carol Lee',    crypt('pass123', gen_salt('bf')), 'Supervisor', 'Steel work - welding',  'carol@example.com'),
('Dan Brown',    crypt('pass123', gen_salt('bf')), 'Other',      NULL,                    'dan@example.com'),
('Eve Patel',    crypt('pass123', gen_salt('bf')), 'General',    'Facilities',            'eve@example.com'),
('Frank Moore',  crypt('pass123', gen_salt('bf')), 'General',    'Rigger',                'frank@example.com'),
('Grace Kim',    crypt('pass123', gen_salt('bf')), 'Supervisor', 'Pipe Fitter',           'grace@example.com'),
('Hank Young',   crypt('pass123', gen_salt('bf')), 'HSE',        'Slinger',               'hank@example.com');

-- DEFECTS (12 total)  
-- NOTE: submitted_by is TEXT in your schema, so we store reporter FULL NAME (not user_id)
-- Columns: title, description, status, urgency, assigned_hours, current_hours,
--          submitted_by, location, relevant_dept, notes, expected_completion, created_at
INSERT INTO "defectData"
(title, description, status, urgency, assigned_hours, current_hours, submitted_by, location, relevant_dept, notes, expected_completion, created_at)
VALUES
('Leaking valve',           'Valve at pump room leaking',          'active',                'high',   10, 2,  'Bob Jones',   'Pump Room A',   'Mechanical Fitter',     'Monitor pressure daily',          CURRENT_DATE + INTERVAL '7 days',  CURRENT_DATE),
('Conduit loose',           'Electrical conduit bracket broken',   'active',                'medium',  8, 8,  'Bob Jones',   'Bay 3',         'Slinger',               'Order replacement bracket',      CURRENT_DATE + INTERVAL '3 days',  CURRENT_DATE),
('Guard rail bent',         'Bent rail on mezzanine',              'active',                'low',     5, 6,  'Grace Kim',   'Mezzanine',     'Rigger',                'Assess for full replacement',    NULL,                        CURRENT_DATE),
('Spill cleanup pending',   'Oil spill awaiting cleanup',          'pending',               'high',    0, 0,  'Alice Smith', 'Dock 2',        'Facilities',            'Need absorbent mats',            CURRENT_DATE + INTERVAL '1 day',  CURRENT_DATE),
('Door misalignment',       'Warehouse door not closing flush',    'pending',               'medium',  3, 1,  'Hank Young',  'Warehouse N',   'Rigger',                'Likely hinge wear',               CURRENT_DATE + INTERVAL '5 days',  CURRENT_DATE),
('Pump impeller replaced',  'Impeller replaced and tested',        'resolved (fixed)',      'high',    7, 7,  'Carol Lee',   'Pump Room B',   'Mechanical Fitter',     'Verified at nominal RPM',        CURRENT_DATE - INTERVAL '1 day',  CURRENT_DATE),
('Cracked casing',          'Casing cracked beyond repair',        'resolved (irreparable)','medium',  4, 4,  'Carol Lee',   'Yard South',    'Steel work - welding',  'Scrap and reorder',              CURRENT_DATE - INTERVAL '2 days',  CURRENT_DATE),
('Overheating motor',       'Motor temp spikes under load',        'active',                'high',   12,11,  'Bob Jones',   'Bay 5',         'Mechanical Fitter',     'Check bearings and load',        CURRENT_DATE + INTERVAL '2 days',  CURRENT_DATE),
('Loose anchor bolts',      'Baseplate bolts need retorque',       'active',                'high',    2, 0,  'Eve Patel',   'Dock 1',        'Operations',            'Torque to spec + Loctite',       NULL,                        CURRENT_DATE),
('Labeling incomplete',     'Pallet labels missing lot codes',     'pending',               'low',     1, 0,  'Frank Moore', 'Warehouse S',   'Facilities',            'Print new labels',                CURRENT_DATE + INTERVAL '2 days',  CURRENT_DATE),
('Panel rattle',            'Rattle at mid-RPM',                   'active',                'medium',  6, 1,  'Bob Jones',   'Test Cell',     'Operations',            'Add damping pads',                CURRENT_DATE + INTERVAL '4 days',  CURRENT_DATE),
('Seal inspection',         'Seal shows minor wear',               'active',                'low',     9, 9,  'Grace Kim',   'Dock 3',        'Mechanical Fitter',     'Monitor next service',            CURRENT_DATE + INTERVAL '10 days', CURRENT_DATE);

-- PHOTOS  
-- One with 0 photos (most), one with 1 photo (job 1), one with 3 photos (job 2), one with 2 photos (job 5)
-- Your schema already has UNIQUE(job_id) and CASCADE FK.
INSERT INTO photos (job_id, photo_data1) VALUES
(1, 'sample_base64_image_1');

INSERT INTO photos (job_id, photo_data1, photo_data2, photo_data3) VALUES
(2, 'sample_base64_image_a', 'sample_base64_image_b', 'sample_base64_image_c');

INSERT INTO photos (job_id, photo_data1, photo_data2) VALUES
(5, 'sample_base64_image_x', 'sample_base64_image_y');