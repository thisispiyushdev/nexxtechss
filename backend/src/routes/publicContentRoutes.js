import express from "express";
import {
  getPublicReviews,
  getPublicStats,
  getPublicBlogs,
  getPublicBlogById,
  getPublicCourses,
  getPublicCourseBySlug,
  getActiveBanner,
} from "../controllers/publicContentController.js";

const router = express.Router();

// Public read-only endpoints (no authentication required)
router.get("/reviews", getPublicReviews);
router.get("/stats", getPublicStats);
router.get("/blogs", getPublicBlogs);
router.get("/blogs/:id", getPublicBlogById);
router.get("/courses", getPublicCourses);
router.get("/courses/:slug", getPublicCourseBySlug);
router.get("/banners/active", getActiveBanner);

export default router;
