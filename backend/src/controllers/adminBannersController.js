import db from "../config/db.js";

// @desc    Get all promotional banners
// @route   GET /api/admin/banners
// @access  Private (Core Admin)
export const getBanners = async (req, res) => {
  try {
    const { rows: data } = await db.query(
      "SELECT * FROM promotional_banners ORDER BY created_at DESC"
    );

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create a new promotional banner
// @route   POST /api/admin/banners
// @access  Private (Core Admin)
export const createBanner = async (req, res) => {
  try {
    const { title, text, link_url, link_text, bg_color, text_color, start_date, end_date, is_active } = req.body;

    // Validate required fields
    if (!title || !text) {
      return res.status(400).json({ success: false, message: "Title and text are required" });
    }

    const { rows: data } = await db.query(
      `INSERT INTO promotional_banners (title, text, link_url, link_text, bg_color, text_color, start_date, end_date, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, text, link_url, link_text, bg_color, text_color, start_date, end_date, is_active]
    );

    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Update a promotional banner
// @route   PUT /api/admin/banners/:id
// @access  Private (Core Admin)
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, link_url, link_text, bg_color, text_color, start_date, end_date, is_active } = req.body;

    const { rows: data } = await db.query(
      `UPDATE promotional_banners 
       SET title = $1, text = $2, link_url = $3, link_text = $4, bg_color = $5, text_color = $6, start_date = $7, end_date = $8, is_active = $9, updated_at = NOW()
       WHERE id = $10 RETURNING *`,
      [title, text, link_url, link_text, bg_color, text_color, start_date, end_date, is_active, id]
    );

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Delete a promotional banner
// @route   DELETE /api/admin/banners/:id
// @access  Private (Core Admin)
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: data } = await db.query(
      "DELETE FROM promotional_banners WHERE id = $1 RETURNING *",
      [id]
    );

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
