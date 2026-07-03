import db from "../config/db.js";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  course_interested: z.string().min(1, "Course is required"),
  branch: z.string().min(1, "Branch is required")
});

export const createEnquiry = async (req, res, next) => {
  try {
    const validatedData = enquirySchema.parse(req.body);

    const { data, error } = await db
      .from('enquiries')
      .insert([{
        name: validatedData.name, phone: validatedData.phone, course_interested: validatedData.course_interested, branch: validatedData.branch
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Enquiry stored successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Supabase insert error (Enquiry):", err);
    res.status(500).json({ 
      error: "Failed to store enquiry in database.",
      details: err.message,
      code: err.code
    });
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    const { data, error } = await db.from('enquiries').select('*').order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
