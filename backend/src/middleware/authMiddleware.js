import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * Middleware to verify JWT token on protected admin routes.
 */
export const requireAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!JWT_SECRET) {
      return res.status(500).json({ error: "Server authentication not configured." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // { username, role }
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

/**
 * Middleware to restrict access to core admins only.
 * Must be used AFTER requireAdmin.
 */
export const requireCoreAdmin = (req, res, next) => {
  if (req.admin?.role !== "core") {
    return res.status(403).json({ error: "Access denied. Core admin privileges required." });
  }
  next();
};
