import express from "express";
import { createBrochureLead, getBrochureLeads } from "../controllers/brochureController.js";

const router = express.Router();

router.post("/", createBrochureLead);
router.get("/", getBrochureLeads);

export default router;
