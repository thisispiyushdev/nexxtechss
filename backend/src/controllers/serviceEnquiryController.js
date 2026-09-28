import db from "../config/db.js";
import { z } from "zod";

const serviceEnquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").or(z.string().min(1, "Email is required")),
  service_interested: z.string().min(1, "Service interested is required"),
  message: z.string().optional().nullable(),
  branch: z.string().optional().nullable(),
  source_url: z.string().optional().nullable(),
});

export const createServiceEnquiry = async (req, res, next) => {
  try {
    const validatedData = serviceEnquirySchema.parse(req.body);

    const { data, error } = await db
      .from('service_enquiries')
      .insert([{
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || '',
        service_interested: validatedData.service_interested,
        message: validatedData.message || '',
        branch: validatedData.branch || 'Noida Sector 2 (+91 7987059430)',
        source_url: validatedData.source_url || '',
        status: 'pending'
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Service enquiry stored successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Supabase insert error (Service Enquiry):", err);
    res.status(500).json({ 
      error: "Failed to store service enquiry in database.",
      details: err.message,
      code: err.code
    });
  }
};

export const getServiceEnquiries = async (req, res, next) => {
  try {
    const { data, error } = await db.from('service_enquiries').select('*').order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
