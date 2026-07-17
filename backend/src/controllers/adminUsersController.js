import bcrypt from "bcryptjs";
import db from "../config/db.js";

/**
 * GET /api/admin/users
 * List all admin accounts from the database (never returns password hashes).
 */
export const getAdminUsers = async (req, res) => {
  try {
    if (req.admin?.role !== "core" && req.admin?.role !== "receptionist" && req.admin?.role !== "noida_receptionist") {
      return res.status(403).json({ error: "Access denied." });
    }
    const { data, error } = await db.from('admins').select('id, username, role, display_name, is_active, created_at').order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Error fetching admin users:", err);
    res.status(500).json({ error: "Failed to fetch admin users." });
  }
};

/**
 * POST /api/admin/users
 * Create a new admin account.
 * Body: { username, password, role, display_name }
 */
export const createAdminUser = async (req, res) => {
  try {
    const { username, password, role, display_name } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: "Username, password, and role are required." });
    }

    if (!["core", "counselor", "noida_counselor", "receptionist", "noida_receptionist"].includes(role)) {
      return res.status(400).json({ error: "Role must be 'core', 'counselor', 'noida_counselor', 'receptionist', or 'noida_receptionist'." });
    }

    if (req.admin?.role !== "core") {
      if (role !== "counselor" && role !== "noida_counselor") {
        return res.status(403).json({ error: "Access denied. Receptionists can only create counselor accounts." });
      }
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // Check if username already exists in env
    if (username === process.env.ADMIN_USERNAME) {
      return res.status(409).json({ error: "This username is reserved." });
    }

    // Check if username already exists in DB
    const { data: existingRows, error: existingError } = await db
      .from('admins')
      .select('id')
      .eq('username', username)
      .limit(1);

    if (existingError) throw existingError;

    if (existingRows.length > 0) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { data, error } = await db
      .from('admins')
      .insert([{
        username, password_hash, role, display_name: display_name || username, is_active: true
      }])
      .select('id, username, role, display_name, is_active, created_at');

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Error creating admin user:", err);
    res.status(500).json({ error: "Failed to create admin user." });
  }
};

/**
 * PUT /api/admin/users/:id
 * Update an admin account.
 * Body: { username?, role?, display_name?, is_active?, password? }
 */
export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role, display_name, is_active, password } = req.body;

    const updates = {};
    if (username !== undefined) updates.username = username;
    if (role !== undefined) {
      if (!["core", "counselor", "noida_counselor", "receptionist", "noida_receptionist"].includes(role)) {
        return res.status(400).json({ error: "Role must be 'core', 'counselor', 'noida_counselor', 'receptionist', or 'noida_receptionist'." });
      }
      
      if (req.admin?.role !== "core") {
        if (role !== "counselor" && role !== "noida_counselor") {
          return res.status(403).json({ error: "Access denied. Receptionists can only assign counselor roles." });
        }
      }

      updates.role = role;
    }
    if (display_name !== undefined) updates.display_name = display_name;
    if (is_active !== undefined) updates.is_active = is_active;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
      }
      updates.password_hash = await bcrypt.hash(password, 12);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    // Check username uniqueness if changing
    if (updates.username) {
      if (updates.username === process.env.ADMIN_USERNAME) {
        return res.status(409).json({ error: "This username is reserved." });
      }
      const { data: existingRows, error: existingError } = await db
        .from('admins')
        .select('id')
        .eq('username', updates.username)
        .neq('id', id)
        .limit(1);
        
      if (existingError) throw existingError;

      if (existingRows.length > 0) {
        return res.status(409).json({ error: "Username already exists." });
      }
    }

    const { data, error } = await db
      .from('admins')
      .update(updates)
      .eq('id', id)
      .select('id, username, role, display_name, is_active, created_at');
    
    if (error) throw error;

    if (!data || data.length === 0) return res.status(404).json({ error: "Admin user not found." });
    res.json(data[0]);
  } catch (err) {
    console.error("Error updating admin user:", err);
    res.status(500).json({ error: "Failed to update admin user." });
  }
};

/**
 * DELETE /api/admin/users/:id
 * Delete an admin account. Cannot delete yourself.
 */
export const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion (only for DB-sourced admins)
    if (req.admin?.id === id) {
      return res.status(403).json({ error: "You cannot delete your own account." });
    }

    const { data, error } = await db.from('admins').delete().eq('id', id).select();

    if (error) throw error;

    if (!data || data.length === 0) {
       return res.status(404).json({ error: "Admin user not found." });
    }
    res.json({ message: "Admin user deleted." });
  } catch (err) {
    console.error("Error deleting admin user:", err);
    res.status(500).json({ error: "Failed to delete admin user." });
  }
};
