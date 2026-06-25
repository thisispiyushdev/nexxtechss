import db from "../config/db.js";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  course_interested: z.string().min(1, "Course is required")
});

export const createEnquiry = async (req, res, next) => {
  try {
    const validatedData = enquirySchema.parse(req.body);

    const { rows: data } = await db.query(
      `INSERT INTO enquiries (name, phone, course_interested)
       VALUES ($1, $2, $3) RETURNING *`,
      [validatedData.name, validatedData.phone, validatedData.course_interested]
    );

    res.status(201).json({ message: "Enquiry stored successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Postgres insert error (Enquiry):", err);
    res.status(500).json({ 
      error: "Failed to store enquiry in database.",
      details: err.message,
      code: err.code
    });
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    const { rows: data } = await db.query("SELECT * FROM enquiries ORDER BY created_at DESC");

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
