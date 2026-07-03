import express from "express";
import { requireAdmin, requireCoreAdmin } from "../middleware/authMiddleware.js";
import { adminLogin, verifyToken } from "../controllers/adminAuthController.js";
import { getAllLeads, deleteLead } from "../controllers/adminLeadsController.js";
import {
  getReviews, createReview, updateReview, deleteReview,
  getStats, createStat, updateStat, deleteStat,
} from "../controllers/adminPlacementsController.js";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/adminBlogsController.js";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../controllers/adminCoursesController.js";
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from "../controllers/adminUsersController.js";
import { getBanners, createBanner, updateBanner, deleteBanner } from "../controllers/adminBannersController.js";
import { getAllBanners as getNoidaBanners, createBanner as createNoidaBanner, updateBanner as updateNoidaBanner, deleteBanner as deleteNoidaBanner } from "../controllers/adminNoidaBannersController.js";

const router = express.Router();

// --- Auth (no middleware) ---
router.post("/login", adminLogin);

// --- All routes below require authentication ---
router.use(requireAdmin);

// Token verification (both roles)
router.get("/verify", verifyToken);

// Leads (both roles — counselor + core)
router.get("/leads", getAllLeads);

// --- Everything below requires CORE admin ---
router.use(requireCoreAdmin);

// Delete Leads (core only)
router.delete("/leads/:table/:id", deleteLead);

// Admin User Management (core only)
router.get("/users", getAdminUsers);
router.post("/users", createAdminUser);
router.put("/users/:id", updateAdminUser);
router.delete("/users/:id", deleteAdminUser);

// Reviews
router.get("/reviews", getReviews);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

// Placement Stats
router.get("/stats", getStats);
router.post("/stats", createStat);
router.put("/stats/:id", updateStat);
router.delete("/stats/:id", deleteStat);

// Blogs
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

// Courses
router.get("/courses", getCourses);
router.post("/courses", createCourse);
router.put("/courses/:slug", updateCourse);
router.delete("/courses/:slug", deleteCourse);

// Banners
router.get("/banners", getBanners);
router.post("/banners", createBanner);
router.put("/banners/:id", updateBanner);
router.delete("/banners/:id", deleteBanner);

// Noida Image Banners
router.get("/noida-banners", getNoidaBanners);
router.post("/noida-banners", createNoidaBanner);
router.put("/noida-banners/:id", updateNoidaBanner);
router.delete("/noida-banners/:id", deleteNoidaBanner);

export default router;
