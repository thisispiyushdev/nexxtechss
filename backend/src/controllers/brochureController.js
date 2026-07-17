import db from "../config/db.js";
import { z } from "zod";

const brochureLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Course is required"),
  branch: z.string().optional()
});

export const createBrochureLead = async (req, res, next) => {
  try {
    const validatedData = brochureLeadSchema.parse(req.body);

    const { data, error } = await db
      .from('brochure_leads')
      .insert([{
        name: validatedData.name, phone: validatedData.phone, email: validatedData.email, course: validatedData.course, branch: validatedData.branch
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Brochure lead stored successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Supabase insert error (Brochure):", err);
    res.status(500).json({ error: "Failed to store brochure lead in database." });
  }
};

export const getBrochureLeads = async (req, res, next) => {
  try {
    const { data, error } = await db.from('brochure_leads').select('*').order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
