import db from "../config/db.js";

/**
 * Public read-only content APIs.
 * These do NOT require authentication and are consumed by the frontend.
 */

// --- Reviews ---
export const getPublicReviews = async (req, res, next) => {
  try {
    const { data, error } = await db.from('reviews').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Placement Stats ---
export const getPublicStats = async (req, res, next) => {
  try {
    const { data, error } = await db.from('placement_stats').select('*').order('sort_order', { ascending: true });
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Blogs ---
export const getPublicBlogs = async (req, res, next) => {
  try {
    const { data, error } = await db.from('blogs').select('id, title, excerpt, author, date, category, read_time, image, created_at').eq('is_active', true).order('created_at', { ascending: false });
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await db.from('blogs').select('*').eq('id', id).eq('is_active', true).limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
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
    const { data, error } = await db.from('courses').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { data, error } = await db.from('courses').select('*').eq('slug', slug).eq('is_active', true).limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
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
    const { data, error } = await db
      .from('promotional_banners')
      .select('*')
      .eq('is_active', true)
      .or('start_date.is.null,start_date.lte.now()')
      .or('end_date.is.null,end_date.gte.now()')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    // Return the first active banner or null if none exist
    res.status(200).json(data && data.length > 0 ? data[0] : null);
  } catch (err) {
    next(err);
  }
};
