import bcrypt from "bcryptjs";
import db from "../config/db.js";

/**
 * GET /api/admin/users
 * List all admin accounts from the database (never returns password hashes).
 */
export const getAdminUsers = async (req, res) => {
  try {
    const { rows: data } = await db.query(
      "SELECT id, username, role, display_name, is_active, created_at FROM admins ORDER BY created_at ASC"
    );

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

    if (!["core", "counselor"].includes(role)) {
      return res.status(400).json({ error: "Role must be 'core' or 'counselor'." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // Check if username already exists in env
    if (username === process.env.ADMIN_USERNAME) {
      return res.status(409).json({ error: "This username is reserved." });
    }

    // Check if username already exists in DB
    const { rows: existingRows } = await db.query(
      "SELECT id FROM admins WHERE username = $1 LIMIT 1",
      [username]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { rows: data } = await db.query(
      `INSERT INTO admins (username, password_hash, role, display_name, is_active)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, display_name, is_active, created_at`,
      [username, password_hash, role, display_name || username, true]
    );

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
      if (!["core", "counselor"].includes(role)) {
        return res.status(400).json({ error: "Role must be 'core' or 'counselor'." });
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
      const { rows: existingRows } = await db.query(
        "SELECT id FROM admins WHERE username = $1 AND id != $2 LIMIT 1",
        [updates.username, id]
      );
      if (existingRows.length > 0) {
        return res.status(409).json({ error: "Username already exists." });
      }
    }

    const fields = [];
    const values = [];
    let queryIndex = 1;

    for (const key of Object.keys(updates)) {
      fields.push(`${key} = $${queryIndex}`);
      values.push(updates[key]);
      queryIndex++;
    }

    values.push(id);
    const query = `UPDATE admins SET ${fields.join(", ")} WHERE id = $${queryIndex} RETURNING id, username, role, display_name, is_active, created_at`;
    
    const { rows: data } = await db.query(query, values);

    if (data.length === 0) return res.status(404).json({ error: "Admin user not found." });
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

    const { rowCount } = await db.query("DELETE FROM admins WHERE id = $1", [id]);

    if (rowCount === 0) {
       return res.status(404).json({ error: "Admin user not found." });
    }
    res.json({ message: "Admin user deleted." });
  } catch (err) {
    console.error("Error deleting admin user:", err);
    res.status(500).json({ error: "Failed to delete admin user." });
  }
};
