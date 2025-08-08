#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Starting Postgres..."
docker compose up -d

echo "[2/4] Applying schema and seed..."
psql postgres://postgres:postgres@localhost:5432/hw_defects -f sql/schema.sql
psql postgres://postgres:postgres@localhost:5432/hw_defects -f sql/seed.sql

echo "[3/4] Starting API..."
( cd api && npm i && npm run dev ) &
API_PID=$!

echo "[4/4] Starting Frontend..."
( cd frontend && npm i && npm run dev ) &
FE_PID=$!

echo "API PID: $API_PID  |  FE PID: $FE_PID"
echo "Open: http://localhost:5173"

wait
