import express from "express";
import { createServiceEnquiry, getServiceEnquiries } from "../controllers/serviceEnquiryController.js";

const router = express.Router();

router.post("/", createServiceEnquiry);
router.get("/", getServiceEnquiries);

export default router;
