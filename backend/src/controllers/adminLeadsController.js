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
    let ldQuery = db.from("leads").select("*").order("created_at", { ascending: false });

    if (req.admin && (req.admin.role === "noida_counselor" || req.admin.role === "noida_receptionist")) {
      eqQuery = eqQuery.ilike("branch", "%Noida%");
      brQuery = brQuery.ilike("branch", "%Noida%");
      rdQuery = rdQuery.ilike("branch", "%Noida%");
      ldQuery = ldQuery.ilike("preferred_location", "%Noida%");
    }
    
    if (req.admin && (req.admin.role === "counselor" || req.admin.role === "receptionist")) {
      eqQuery = eqQuery.ilike("branch", "%Delhi%");
      brQuery = brQuery.ilike("branch", "%Delhi%");
      rdQuery = rdQuery.ilike("branch", "%Delhi%");
      ldQuery = ldQuery.ilike("preferred_location", "%Delhi%");
    }

    // Fetch from all tables in parallel
    const [enquiriesRes, brochureRes, roadmapRes, leadsRes] = await Promise.all([
      eqQuery,
      brQuery,
      rdQuery,
      ldQuery,
    ]);

    const leads = [];

    // Merge enquiries
    if (!enquiriesRes.error && enquiriesRes.data) {
      enquiriesRes.data.forEach((item) => {
        leads.push({
          ...item,
          source: item.source || "Enquiry",
          source_table: "enquiries",
          email: item.email || "—",
          course: item.course_interested || "—",
          status: item.status || "pending",
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
          status: item.status || "pending",
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
          status: item.status || "pending",
        });
      });
    }

    // Merge general leads table
    if (!leadsRes.error && leadsRes.data) {
      leadsRes.data.forEach((item) => {
        leads.push({
          ...item,
          branch: item.preferred_location || item.branch || "—",
          source: item.source || "General Lead",
          source_table: "leads",
          email: item.email || "—",
          course: item.course || item.course_interested || "—",
          status: item.status || "pending",
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
    if (leadsRes.error) errors.push({ table: "leads", error: leadsRes.error.message });

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
    if (req.admin && (req.admin.role === "receptionist" || req.admin.role === "noida_receptionist")) {
      return res.status(403).json({ error: "Receptionists are not allowed to delete leads." });
    }
    const { table, id } = req.params;

    // Whitelist allowed tables to prevent SQL injection
    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads", "leads"];
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

/**
 * PUT /api/admin/leads/transfer/:table/:id
 * Transfers a lead to a new branch (Delhi <-> Noida).
 */
export const transferLead = async (req, res, next) => {
  try {
    if (req.admin && (req.admin.role === "counselor" || req.admin.role === "noida_counselor")) {
      return res.status(403).json({ error: "Counselors cannot transfer leads." });
    }
    const { table, id } = req.params;
    const { branch } = req.body;

    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads", "leads"];
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Invalid table name." });
    }

    if (!branch) {
      return res.status(400).json({ error: "Branch is required." });
    }

    const { data: oldLead, error: fetchError } = await db.from(table).select('branch').eq('id', id).single();
    if (fetchError || !oldLead) {
      return res.status(404).json({ error: "Lead not found." });
    }

    const { error } = await db.from(table).update({ 
      branch,
      transferred_from: oldLead.branch || "Unknown"
    }).eq('id', id);

    if (error) {
      console.error(`Transfer lead error (${table}):`, error);
      return res.status(500).json({ error: "Failed to transfer lead." });
    }

    res.status(200).json({ message: "Lead transferred successfully." });
  } catch (err) {
    console.error(`Transfer lead error (${req.params.table}):`, err);
    res.status(500).json({ error: "Failed to transfer lead." });
  }
};

/**
 * PUT /api/admin/leads/assign/:table/:id
 * Assigns a lead to a counselor.
 */
export const assignLead = async (req, res, next) => {
  try {
    if (req.admin && (req.admin.role === "counselor" || req.admin.role === "noida_counselor")) {
      return res.status(403).json({ error: "Counselors cannot re-assign leads." });
    }
    const { table, id } = req.params;
    const { counselor_id } = req.body;

    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads", "leads"];
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Invalid table name." });
    }

    if (!counselor_id) {
      return res.status(400).json({ error: "Counselor ID is required." });
    }

    const { error } = await db.from(table).update({ counselor_id }).eq('id', id);

    if (error) {
      console.error(`Assign lead error (${table}):`, error);
      return res.status(500).json({ error: "Failed to assign lead." });
    }

    res.status(200).json({ message: "Lead assigned successfully." });
  } catch (err) {
    console.error(`Assign lead error (${req.params.table}):`, err);
    res.status(500).json({ error: "Failed to assign lead." });
  }
};

/**
 * PUT /api/admin/leads/status/:table/:id
 * Updates the status of a lead (pending, dead, converted).
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    const { status } = req.body;

    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads", "leads"];
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Invalid table name." });
    }

    const validStatuses = ["pending", "dead", "converted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const { error } = await db.from(table).update({ status }).eq('id', id);

    if (error) {
      console.error(`Update lead status error (${table}):`, error);
      return res.status(500).json({ error: "Failed to update lead status." });
    }

    res.status(200).json({ message: "Lead status updated successfully." });
  } catch (err) {
    console.error(`Update lead status error (${req.params.table}):`, err);
    res.status(500).json({ error: "Failed to update lead status." });
  }
};

/**
 * POST /api/admin/leads/bulk-delete
 * Bulk deletes leads across multiple tables.
 * Expected body: { leads: [{ id, table }] }
 */
export const bulkDeleteLeads = async (req, res, next) => {
  try {
    if (req.admin && (req.admin.role === "receptionist" || req.admin.role === "noida_receptionist" || req.admin.role === "counselor" || req.admin.role === "noida_counselor")) {
      return res.status(403).json({ error: "Only Core Admins can bulk delete leads." });
    }

    const { leads } = req.body;
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: "Invalid or empty leads array." });
    }

    const allowedTables = ["enquiries", "brochure_leads", "roadmap_leads", "leads"];
    
    // Group IDs by table for efficient bulk deletion
    const grouped = {
      enquiries: [],
      brochure_leads: [],
      roadmap_leads: [],
      leads: []
    };

    leads.forEach(lead => {
      if (allowedTables.includes(lead.table) && lead.id) {
        grouped[lead.table].push(lead.id);
      }
    });

    // Perform deletions in parallel
    const deletePromises = [];
    for (const table of allowedTables) {
      if (grouped[table].length > 0) {
        deletePromises.push(db.from(table).delete().in('id', grouped[table]));
      }
    }

    const results = await Promise.all(deletePromises);
    
    const errors = results.filter(r => r.error).map(r => r.error.message);
    if (errors.length > 0) {
      console.error("Bulk delete leads errors:", errors);
      return res.status(500).json({ error: "Failed to delete some leads.", details: errors });
    }

    res.status(200).json({ message: "Leads bulk deleted successfully." });
  } catch (err) {
    console.error("Bulk delete leads error:", err);
    res.status(500).json({ error: "Failed to bulk delete leads." });
  }
};

