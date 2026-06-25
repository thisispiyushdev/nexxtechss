import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import enquiryRoutes from "./routes/enquiryRoutes.js";
import brochureRoutes from "./routes/brochureRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicContentRoutes from "./routes/publicContentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers

// CORS configuration and Edge Cache control
const allowedOrigins = [
  "https://nexxtechs.com",
  "https://www.nexxtechs.com",
  "https://nexxtech-oi8e.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Robust check if origin is allowed
  let isAllowed = false;
  if (origin) {
    const normalizedOrigin = origin.replace(/\/$/, ""); // Remove trailing slash if present
    isAllowed = allowedOrigins.includes(normalizedOrigin) || 
                normalizedOrigin.endsWith(".vercel.app") || 
                normalizedOrigin.endsWith(".pages.dev") ||
                /^https?:\/\/([a-z0-9-]+\.)*nexxtechs\.com$/i.test(normalizedOrigin);
  }

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Default fallback
    res.setHeader("Access-Control-Allow-Origin", "https://nexxtechs.com");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  
  // Explicitly tell Vercel Edge and browsers to Vary by Origin
  res.setHeader("Vary", "Origin");

  // Cache public GET requests, prevent caching for other endpoints to avoid stale CORS/data
  if (req.method === "GET" && (req.path.startsWith("/api/content") || req.path.startsWith("/content"))) {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=60");
  } else {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api", (req, res, next) => {
  console.log(`📡 API Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/enquiry", enquiryRoutes);
// Kept for backward compatibility with older verson of app.
app.use("/api/enquiries", enquiryRoutes);

app.use("/api/brochure-download", brochureRoutes);
app.use("/api/brochure-leads", brochureRoutes);
app.use("/api/roadmap-leads", roadmapRoutes);

// Admin routes (login + protected CRUD)
app.use("/api/admin", adminRoutes);

// Public content routes (read-only, no auth)
app.use("/api/content", publicContentRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", environment: process.env.NODE_ENV || "development" });
});

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "NEXXTECHS API Running" });
});

// Error handling middleware (must be after all routes)
app.use(errorHandler);

export default app;
