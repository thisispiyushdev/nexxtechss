import db from "../config/db.js";

/**
 * GET /api/admin/leads
 * Fetches all leads from enquiries, brochure_leads, and roadmap_leads tables.
 * Merges them with a source label and sorts by created_at descending.
 */
export const getAllLeads = async (req, res, next) => {
  try {
    // Fetch from all three tables in parallel
    const [enquiriesRes, brochureRes, roadmapRes] = await Promise.all([
      db.query("SELECT * FROM enquiries ORDER BY created_at DESC").catch(e => ({ error: e, rows: [] })),
      db.query("SELECT * FROM brochure_leads ORDER BY created_at DESC").catch(e => ({ error: e, rows: [] })),
      db.query("SELECT * FROM roadmap_leads ORDER BY created_at DESC").catch(e => ({ error: e, rows: [] })),
    ]);

    const leads = [];

    // Merge enquiries
    if (!enquiriesRes.error && enquiriesRes.rows) {
      enquiriesRes.rows.forEach((item) => {
        leads.push({
          ...item,
          source: "Enquiry",
          source_table: "enquiries",
          email: item.email || "—",
          course: item.course_interested || "—",
        });
      });
    }

    // Merge brochure leads
    if (!brochureRes.error && brochureRes.rows) {
      brochureRes.rows.forEach((item) => {
        leads.push({
          ...item,
          source: "Brochure Download",
          source_table: "brochure_leads",
          course: item.course || "—",
        });
      });
    }

    // Merge roadmap leads
    if (!roadmapRes.error && roadmapRes.rows) {
      roadmapRes.rows.forEach((item) => {
        leads.push({
          ...item,
          source: "Roadmap Enquiry",
          source_table: "roadmap_leads",
          email: item.email || "—",
          course: item.course_interested || "—",
        });
      });
    }

    // Sort all merged leads by created_at descending
    leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Collect any errors
    const errors = [];
    if (enquiriesRes.error) errors.push({ table: "enquiries", error: enquiriesRes.error.message });
    if (brochureRes.error) errors.push({ table: "brochure_leads", error: brochureRes.error.message });
    if (roadmapRes.error) errors.push({ table: "roadmap_leads", error: roadmapRes.error.message });

    res.status(200).json({
      leads,
      total: leads.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/leads/:table/:id
 * Deletes a specific lead from the specified table.
 */
export const deleteLead = async (req, res, next) => {
  try {
    const { table, id } = req.params;

    // Whitelist allowed tables to prevent SQL injection
    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads"];
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Invalid table name." });
    }

    const { rowCount } = await db.query(`DELETE FROM ${table} WHERE id = $1`, [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Lead not found." });
    }

    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (err) {
    console.error(`Delete lead error (${req.params.table}):`, err);
    res.status(500).json({ error: "Failed to delete lead." });
  }
};
