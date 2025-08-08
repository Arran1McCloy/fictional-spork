/**
 * Verification script:
 * - Logs in as Supervisor (Bob Jones) and checks dashboard golden numbers
 * - Logs in as General (Alice Smith) and asserts /defects is forbidden
 */
const BASE = process.env.BASE || 'http://localhost:8080';

async function login(full_name, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, password }),
    redirect: 'manual'
  });
  const setCookie = res.headers.get('set-cookie') || '';
  const cookie = setCookie.split(';')[0]; // sid=...
  const body = await res.json().catch(() => ({}));
  if (!cookie || !res.ok) {
    throw new Error(`Login failed for ${full_name}: ${res.status} ${JSON.stringify(body)}`);
  }
  return { cookie, body };
}

async function get(path, cookie) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Cookie': cookie }
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function assertEqual(actual, expected, label) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(ok ? `✅ ${label}` : `❌ ${label}\n   expected: ${JSON.stringify(expected)}\n   actual:   ${JSON.stringify(actual)}`);
  if (!ok) process.exitCode = 1;
}

(async () => {
  try {
    // Supervisor checks
    const sup = await login('Bob Jones', 'pass123');
    const counts = await get('/dashboard/counts', sup.cookie);
    assertEqual(counts.status, 200, 'counts status 200');
    assertEqual(counts.data, { active: 7, pending: 3, high_priority_open: 4 }, 'dashboard counts match');

    const urg = await get('/dashboard/urgency-distribution', sup.cookie);
    assertEqual(urg.status, 200, 'urgency status 200');
    // Allow any order, normalize
    const normUrg = [...urg.data].sort((a,b)=>a.label.localeCompare(b.label));
    assertEqual(normUrg, [
      { label: 'high', count: 3 },
      { label: 'low', count: 2 },
      { label: 'medium', count: 2 }
    ], 'urgency distribution matches');

    const stat = await get('/dashboard/status-distribution', sup.cookie);
    assertEqual(stat.status, 200, 'status dist status 200');
    const normStat = [...stat.data].sort((a,b)=>a.label.localeCompare(b.label));
    assertEqual(normStat, [
      { label: 'active', count: 7 },
      { label: 'pending', count: 3 },
      { label: 'resolved (irreparable)', count: 1 }
    ], 'status distribution matches');

    // RBAC: General cannot list defects
    const gen = await login('Alice Smith', 'pass123');
    const listGen = await get('/defects', gen.cookie);
    assertEqual(listGen.status, 403, 'General cannot list defects');

    // RBAC: Supervisor can list defects
    const listSup = await get('/defects', sup.cookie);
    assertEqual(listSup.status, 200, 'Supervisor can list defects');

    console.log(process.exitCode ? "\n❌ Verification had failures" : "\n✅ All verifications passed");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
