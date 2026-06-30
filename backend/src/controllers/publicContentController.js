import db from "../config/db.js";

/**
 * Public read-only content APIs.
 * These do NOT require authentication and are consumed by the frontend.
 * We use simple in-memory caching to improve performance in production.
 */

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache = {
  reviews: { data: null, timestamp: 0 },
  stats: { data: null, timestamp: 0 },
  blogs: { data: null, timestamp: 0 },
  courses: { data: null, timestamp: 0 },
  banner: { data: null, timestamp: 0 },
  blogById: new Map(),
  courseBySlug: new Map(),
};

// --- Reviews ---
export const getPublicReviews = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.reviews.data && (now - cache.reviews.timestamp < CACHE_TTL)) {
      return res.status(200).json(cache.reviews.data);
    }

    const { data, error } = await db.from('reviews').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    if (error) throw error;

    cache.reviews = { data, timestamp: now };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Placement Stats ---
export const getPublicStats = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.stats.data && (now - cache.stats.timestamp < CACHE_TTL)) {
      return res.status(200).json(cache.stats.data);
    }

    const { data, error } = await db.from('placement_stats').select('*').order('sort_order', { ascending: true });
    if (error) throw error;

    cache.stats = { data, timestamp: now };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// --- Blogs ---
export const getPublicBlogs = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.blogs.data && (now - cache.blogs.timestamp < CACHE_TTL)) {
      return res.status(200).json(cache.blogs.data);
    }

    const { data, error } = await db.from('blogs').select('id, title, excerpt, author, date, category, read_time, image, created_at').eq('is_active', true).order('created_at', { ascending: false });
    if (error) throw error;

    cache.blogs = { data, timestamp: now };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const now = Date.now();

    const cached = cache.blogById.get(id);
    if (cached && (now - cached.timestamp < CACHE_TTL)) {
      return res.status(200).json(cached.data);
    }

    const { data, error } = await db.from('blogs').select('*').eq('id', id).eq('is_active', true).limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    
    cache.blogById.set(id, { data: data[0], timestamp: now });
    res.status(200).json(data[0]);
  } catch (err) {
    next(err);
  }
};

// --- Courses ---
export const getPublicCourses = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.courses.data && (now - cache.courses.timestamp < CACHE_TTL)) {
      return res.status(200).json(cache.courses.data);
    }

    const { data, error } = await db.from('courses').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    if (error) throw error;

    cache.courses = { data, timestamp: now };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPublicCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const now = Date.now();

    const cached = cache.courseBySlug.get(slug);
    if (cached && (now - cached.timestamp < CACHE_TTL)) {
      return res.status(200).json(cached.data);
    }

    const { data, error } = await db.from('courses').select('*').eq('slug', slug).eq('is_active', true).limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    
    cache.courseBySlug.set(slug, { data: data[0], timestamp: now });
    res.status(200).json(data[0]);
  } catch (err) {
    next(err);
  }
};

// --- Promotional Banners ---
export const getActiveBanner = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.banner.data !== null && (now - cache.banner.timestamp < CACHE_TTL)) {
      return res.status(200).json(cache.banner.data);
    }

    const { data, error } = await db
      .from('promotional_banners')
      .select('*')
      .eq('is_active', true)
      .or('start_date.is.null,start_date.lte.now()')
      .or('end_date.is.null,end_date.gte.now()')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    const bannerData = data && data.length > 0 ? data[0] : null;
    cache.banner = { data: bannerData, timestamp: now };
    
    // Return the first active banner or null if none exist
    res.status(200).json(bannerData);
  } catch (err) {
    next(err);
  }
};
