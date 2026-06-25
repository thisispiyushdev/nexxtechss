/**
 * Standalone admin API instance — completely outside React's render cycle.
 * This prevents infinite re-render loops caused by creating axios instances in hooks.
 */
import axios from "axios";

import { ADMIN_API_ROOT } from "./apiConfig";

import { addTrailingSlashInterceptor } from "./apiHelper";

const adminApi = axios.create({
  baseURL: ADMIN_API_ROOT,
  headers: { "Content-Type": "application/json" },
});

addTrailingSlashInterceptor(adminApi);

// Attach token to every request
adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear token
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_role");
      window.location.href = "/admin";
    }
    return Promise.reject(err);
  }
);

export default adminApi;
