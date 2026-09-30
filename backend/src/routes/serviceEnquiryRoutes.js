import express from "express";
import { createServiceEnquiry, getServiceEnquiries } from "../controllers/serviceEnquiryController.js";
import { requireAdmin, requireCoreAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createServiceEnquiry);
router.get("/", requireAdmin, requireCoreAdmin, getServiceEnquiries);

export default router;
