import db from "../config/db.js";
import { z } from "zod";

// --- Reviews ---

const MAX_IMAGE_BYTES = 200 * 1024; // 200 KB

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  image: z.string().optional().default("").refine(
    (val) => {
      if (!val || !val.startsWith("data:image/")) return true;
      const base64Part = val.split(",")[1] || "";
      const sizeInBytes = Math.ceil((base64Part.length * 3) / 4);
      return sizeInBytes <= MAX_IMAGE_BYTES;
    },
    { message: "Image must be under 200 KB. Please compress or resize the image." }
  ),
  text: z.string().min(1, "Review text is required"),
  is_active: z.boolean().optional().default(true),
  sort_order: z.number().optional().default(0),
});

export const getReviews = async (req, res, next) => {
  try {
    const { data, error } = await db.from('reviews').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const validated = reviewSchema.parse(req.body);

    const { data, error } = await db
      .from('reviews')
      .insert([{
        name: validated.name, role: validated.role, company: validated.company,
        image: validated.image, text: validated.text, is_active: validated.is_active,
        sort_order: validated.sort_order
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Review created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Create review error:", err);
    res.status(500).json({ error: "Failed to create review." });
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = reviewSchema.partial().parse(req.body);

    if (Object.keys(validated).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    const { data, error } = await db
      .from('reviews')
      .update(validated)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json({ message: "Review updated successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Update review error:", err);
    res.status(500).json({ error: "Failed to update review." });
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await db.from('reviews').delete().eq('id', id).select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ error: "Failed to delete review." });
  }
};

// --- Placement Stats ---

const statSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.number().min(0, "Value must be non-negative"),
  suffix: z.string().optional().default("+"),
  icon: z.string().optional().default("Users"),
  sort_order: z.number().optional().default(0),
});

export const getStats = async (req, res, next) => {
  try {
    const { data, error } = await db.from('placement_stats').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createStat = async (req, res, next) => {
  try {
    const validated = statSchema.parse(req.body);

    const { data, error } = await db
      .from('placement_stats')
      .insert([{
        label: validated.label, value: validated.value, suffix: validated.suffix,
        icon: validated.icon, sort_order: validated.sort_order
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Stat created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: "Failed to create stat." });
  }
};

export const updateStat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = statSchema.partial().parse(req.body);

    if (Object.keys(validated).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    const { data, error } = await db
      .from('placement_stats')
      .update(validated)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Stat not found." });
    }
    res.status(200).json({ message: "Stat updated successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: "Failed to update stat." });
  }
};

export const deleteStat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await db.from('placement_stats').delete().eq('id', id).select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Stat not found." });
    }
    res.status(200).json({ message: "Stat deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete stat." });
  }
};
