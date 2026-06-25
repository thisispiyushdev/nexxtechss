import db from "../config/db.js";
import { z } from "zod";

const roadmapLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  course_interested: z.string().min(1, "Course is required")
});

export const createRoadmapLead = async (req, res, next) => {
  try {
    const validatedData = roadmapLeadSchema.parse(req.body);

    let queryResult;
    try {
      queryResult = await db.query(
        `INSERT INTO roadmap_leads (name, phone, course_interested)
         VALUES ($1, $2, $3) RETURNING *`,
        [validatedData.name, validatedData.phone, validatedData.course_interested]
      );
    } catch (err) {
      // If the roadmap_leads table does not exist (PostgreSQL error code 42P01), fallback to enquiries table
      if (err.code === '42P01') {
        console.warn("Table 'roadmap_leads' missing. Falling back to 'enquiries' table.");
        queryResult = await db.query(
          `INSERT INTO enquiries (name, phone, course_interested)
           VALUES ($1, $2, $3) RETURNING *`,
          [validatedData.name, validatedData.phone, `[ROADMAP] ${validatedData.course_interested}`]
        );
      } else {
        throw err;
      }
    }

    res.status(201).json({ message: "Roadmap lead stored successfully", data: queryResult.rows });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Postgres insert error (Roadmap Lead):", err);
    res.status(500).json({ 
      error: "Failed to store roadmap lead in database.",
      details: err.message,
      code: err.code
    });
  }
};
