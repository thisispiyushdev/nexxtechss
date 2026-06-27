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
      const { data, error } = await db
        .from('roadmap_leads')
        .insert([{
          name: validatedData.name, phone: validatedData.phone, course_interested: validatedData.course_interested
        }])
        .select();

      if (error) {
        if (error.code === '42P01') {
          console.warn("Table 'roadmap_leads' missing. Falling back to 'enquiries' table.");
          const { data: fallbackData, error: fallbackError } = await db
            .from('enquiries')
            .insert([{
              name: validatedData.name, phone: validatedData.phone, course_interested: `[ROADMAP] ${validatedData.course_interested}`
            }])
            .select();
          
          if (fallbackError) throw fallbackError;
          queryResult = fallbackData;
        } else {
          throw error;
        }
      } else {
        queryResult = data;
      }
    } catch (err) {
      throw err;
    }

    res.status(201).json({ message: "Roadmap lead stored successfully", data: queryResult });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Supabase insert error (Roadmap Lead):", err);
    res.status(500).json({ 
      error: "Failed to store roadmap lead in database.",
      details: err.message,
      code: err.code
    });
  }
};
