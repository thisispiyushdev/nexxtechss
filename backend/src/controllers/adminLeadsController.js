import db from "../config/db.js";

/**
 * GET /api/admin/leads
 * Fetches all leads from enquiries, brochure_leads, and roadmap_leads tables.
 * Merges them with a source label and sorts by created_at descending.
 */
export const getAllLeads = async (req, res, next) => {
  try {
    let eqQuery = db.from("enquiries").select("*").order("created_at", { ascending: false });
    let brQuery = db.from("brochure_leads").select("*").order("created_at", { ascending: false });
    let rdQuery = db.from("roadmap_leads").select("*").order("created_at", { ascending: false });

    if (req.admin && req.admin.role === "noida_counselor") {
      eqQuery = eqQuery.ilike("branch", "%Noida%");
      brQuery = brQuery.ilike("branch", "%Noida%");
      rdQuery = rdQuery.ilike("branch", "%Noida%");
    }
    
    if (req.admin && req.admin.role === "counselor") {
      eqQuery = eqQuery.ilike("branch", "%Delhi%");
      brQuery = brQuery.ilike("branch", "%Delhi%");
      rdQuery = rdQuery.ilike("branch", "%Delhi%");
    }

    // Fetch from all three tables in parallel
    const [enquiriesRes, brochureRes, roadmapRes] = await Promise.all([
      eqQuery,
      brQuery,
      rdQuery,
    ]);

    const leads = [];

    // Merge enquiries
    if (!enquiriesRes.error && enquiriesRes.data) {
      enquiriesRes.data.forEach((item) => {
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
    if (!brochureRes.error && brochureRes.data) {
      brochureRes.data.forEach((item) => {
        leads.push({
          ...item,
          source: "Brochure Download",
          source_table: "brochure_leads",
          course: item.course || "—",
        });
      });
    }

    // Merge roadmap leads
    if (!roadmapRes.error && roadmapRes.data) {
      roadmapRes.data.forEach((item) => {
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

    const { error } = await db.from(table).delete().eq('id', id);

    if (error) {
      console.error(`Delete lead error (${req.params.table}):`, error);
      return res.status(500).json({ error: "Failed to delete lead." });
    }

    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (err) {
    console.error(`Delete lead error (${req.params.table}):`, err);
    res.status(500).json({ error: "Failed to delete lead." });
  }
};
