// Replace mock UI data with these calls when your backend is ready.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function getDashboardSummary() {
  const res = await fetch(`${API_BASE}/api/dashboard/summary`);
  if (!res.ok) throw new Error('Unable to load dashboard summary');
  return res.json();
}

export async function getViolations() {
  const res = await fetch(`${API_BASE}/api/violations`);
  if (!res.ok) throw new Error('Unable to load violations');
  return res.json();
}
