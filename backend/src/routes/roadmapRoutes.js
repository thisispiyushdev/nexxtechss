import express from "express";
import { createRoadmapLead } from "../controllers/roadmapController.js";

const router = express.Router();

router.post("/", createRoadmapLead);

export default router;
