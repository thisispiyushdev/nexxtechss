import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

// Single hardcoded core admin (fallback / super-admin)
const HARDCODED_ADMIN = {
  username: process.env.ADMIN_USERNAME || "",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
  role: "core",
  display_name: "Super Admin",
};

/**
 * POST /api/admin/login
 * Checks credentials against:
 *   1. The hardcoded super-admin in .env
 *   2. The `admins` table in Supabase (dynamic accounts created from the panel)
 */
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured");
      return res.status(500).json({ error: "Admin authentication not configured." });
    }

    // ---- 1. Check hardcoded super-admin ----
    if (
      HARDCODED_ADMIN.username &&
      username === HARDCODED_ADMIN.username
    ) {
      const isValid = await bcrypt.compare(password, HARDCODED_ADMIN.passwordHash);
      if (isValid) {
        const token = jwt.sign(
          { username: HARDCODED_ADMIN.username, role: HARDCODED_ADMIN.role, source: "env" },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          role: HARDCODED_ADMIN.role,
          display_name: HARDCODED_ADMIN.display_name,
          expiresIn: "24h",
        });
      }
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ---- 2. Check database admins ----
    const { data: rows, error } = await db
      .from('admins')
      .select('*')
      .eq('username', username)
      .eq('is_active', true);
      
    if (error) throw error;
    
    const dbAdmin = rows && rows.length > 0 ? rows[0] : null;

    if (!dbAdmin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isValid = await bcrypt.compare(password, dbAdmin.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: dbAdmin.id, username: dbAdmin.username, role: dbAdmin.role, source: "db" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: dbAdmin.role,
      display_name: dbAdmin.display_name || dbAdmin.username,
      expiresIn: "24h",
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

/**
 * GET /api/admin/verify
 * Verifies the current JWT token is still valid.
 */
export const verifyToken = (req, res) => {
  res.status(200).json({ valid: true, admin: req.admin });
};
