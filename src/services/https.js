// src/services/http.js
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:4000";

let tokenProvider = () => null;

export function setTokenProvider(fn) {
  tokenProvider = typeof fn === "function" ? fn : () => null;
}

export async function apiFetch(path, { method = "GET", body, headers = {}, auth = false } = {}) {
  const h = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (auth) {
    const token = tokenProvider();
    if (token) h.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // if using httpOnly cookies, keep this
  });

  // Handle non-2xx
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      msg = err.message || msg;
    } catch {}
    const e = new Error(msg);
    e.status = res.status;
    throw e;
  }

  // Try JSON, else return raw
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}
