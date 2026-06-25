import db from "../config/db.js";
import { z } from "zod";

const brochureLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Course is required")
});

export const createBrochureLead = async (req, res, next) => {
  try {
    const validatedData = brochureLeadSchema.parse(req.body);

    const { rows: data } = await db.query(
      `INSERT INTO brochure_leads (name, phone, email, course)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [validatedData.name, validatedData.phone, validatedData.email, validatedData.course]
    );

    res.status(201).json({ message: "Brochure lead stored successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Postgres insert error (Brochure):", err);
    res.status(500).json({ error: "Failed to store brochure lead in database." });
  }
};

export const getBrochureLeads = async (req, res, next) => {
  try {
    const { rows: data } = await db.query("SELECT * FROM brochure_leads ORDER BY created_at DESC");

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
