import db from "../config/db.js";

// @desc    Get all promotional banners
// @route   GET /api/admin/banners
// @access  Private (Core Admin)
export const getBanners = async (req, res) => {
  try {
    const { data, error } = await db
      .from('promotional_banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

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
    const { title, text, link_url, link_text, target_page, bg_color, text_color, start_date, end_date, is_active } = req.body;

    // Validate required fields
    if (!title || !text) {
      return res.status(400).json({ success: false, message: "Title and text are required" });
    }

    const { data, error } = await db
      .from('promotional_banners')
      .insert([{ title, text, link_url, link_text, target_page, bg_color, text_color, start_date, end_date, is_active }])
      .select();

    if (error) throw error;

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
    const { title, text, link_url, link_text, target_page, bg_color, text_color, start_date, end_date, is_active } = req.body;

    const { data, error } = await db
      .from('promotional_banners')
      .update({ title, text, link_url, link_text, target_page, bg_color, text_color, start_date, end_date, is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw error;

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

    const { data, error } = await db
      .from('promotional_banners')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
