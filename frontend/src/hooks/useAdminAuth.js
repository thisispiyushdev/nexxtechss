import { useState, useEffect, useCallback } from "react";
import adminApi from "@/lib/adminApi";

/**
 * Simple auth hook — only manages login/logout state.
 * The actual API instance is in lib/adminApi.js (singleton, outside React).
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // "core" or "counselor"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const savedRole = sessionStorage.getItem("admin_role");
    if (token) {
      setIsAuthenticated(true);
      setRole(savedRole || "counselor");
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await adminApi.post("/login", { username, password });
    sessionStorage.setItem("admin_token", res.data.token);
    sessionStorage.setItem("admin_role", res.data.role);
    setIsAuthenticated(true);
    setRole(res.data.role);
    return res.data;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_role");
    setIsAuthenticated(false);
    setRole(null);
  }, []);

  return { isAuthenticated, loading, login, logout, role };
}
