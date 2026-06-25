const RAW_API_ORIGIN = process.env.REACT_APP_API_URL || "";

export const API_ORIGIN = RAW_API_ORIGIN.replace(/\/+$/, "");
export const API_ROOT = API_ORIGIN ? `${API_ORIGIN}/api` : "/api";
export const ADMIN_API_ROOT = `${API_ROOT}/admin`;