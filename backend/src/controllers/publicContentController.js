import db from "../config/db.js";

/**
 * Public read-only content APIs.
 * These do NOT require authentication and are consumed by the frontend.
 */

// --- Reviews ---
export const getPublicReviews = async (req, res, next) => {
  try {
    const { rows: data } = await db.query(
      "SELECT * FROM reviews WHERE is_active = true ORDER BY sort_order ASC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Placement Stats ---
export const getPublicStats = async (req, res, next) => {
  try {
    const { rows: data } = await db.query(
      "SELECT * FROM placement_stats ORDER BY sort_order ASC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Blogs ---
export const getPublicBlogs = async (req, res, next) => {
  try {
    const { rows: data } = await db.query(
      "SELECT id, title, excerpt, author, date, category, read_time, image, created_at FROM blogs WHERE is_active = true ORDER BY created_at DESC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows: data } = await db.query(
      "SELECT * FROM blogs WHERE id = $1 AND is_active = true LIMIT 1",
      [id]
    );

    if (data.length === 0) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    
    res.status(200).json(data[0]);
  } catch (err) {
    next(err);
  }
};

// --- Courses ---
export const getPublicCourses = async (req, res, next) => {
  try {
    const { rows: data } = await db.query(
      "SELECT * FROM courses WHERE is_active = true ORDER BY sort_order ASC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { rows: data } = await db.query(
      "SELECT * FROM courses WHERE slug = $1 AND is_active = true LIMIT 1",
      [slug]
    );

    if (data.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    
    res.status(200).json(data[0]);
  } catch (err) {
    next(err);
  }
};

// --- Promotional Banners ---
export const getActiveBanner = async (req, res, next) => {
  try {
    const { rows: data } = await db.query(
      `SELECT * FROM promotional_banners 
       WHERE is_active = true 
       AND (start_date IS NULL OR start_date <= NOW()) 
       AND (end_date IS NULL OR end_date >= NOW()) 
       ORDER BY created_at DESC LIMIT 1`
    );

    // Return the first active banner or null if none exist
    res.status(200).json(data.length > 0 ? data[0] : null);
  } catch (err) {
    next(err);
  }
};
