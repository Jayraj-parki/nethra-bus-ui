import { apiFetch } from "./https";


// Adjust paths to your backend
export const authApi = {
  register: (payload) => apiFetch("/auth/register", { method: "POST", body: payload }),
  login: (payload) => apiFetch("/auth/login", { method: "POST", body: payload }),
  logout: () => apiFetch("/auth/logout", { method: "POST" }),
  me: () => apiFetch("/auth/me", { method: "GET", auth: true }),
};
