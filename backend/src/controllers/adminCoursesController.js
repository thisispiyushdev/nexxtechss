import db from "../config/db.js";
import { z } from "zod";

const MAX_IMAGE_BYTES = 200 * 1024; // 200 KB

const courseSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  image: z.string().optional().default("").refine(
    (val) => {
      if (!val || !val.startsWith("data:image/")) return true;
      const base64Part = val.split(",")[1] || "";
      const sizeInBytes = Math.ceil((base64Part.length * 3) / 4);
      return sizeInBytes <= MAX_IMAGE_BYTES;
    },
    { message: "Image must be under 200 KB. Please compress or resize the image." }
  ),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
  overview: z.string().min(1, "Overview is required"),
  is_popular: z.boolean().optional().default(false),
  is_trending: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  batch_timings: z.array(z.string()).optional().default([]),
  highlights: z.array(z.string()).optional().default([]),
  trending_tools: z.array(z.string()).optional().default([]),
  modules: z.array(z.object({
    name: z.string(),
    topics: z.array(z.string()),
  })).optional().default([]),
  brochure_url: z.string().optional().default(""),
  sort_order: z.number().optional().default(0),
});

export const getCourses = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from('courses')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const validated = courseSchema.parse(req.body);

    const { data, error } = await db
      .from('courses')
      .insert([{
        slug: validated.slug, title: validated.title, tagline: validated.tagline, 
        image: validated.image, duration: validated.duration, level: validated.level, 
        overview: validated.overview, is_popular: validated.is_popular,
        is_trending: validated.is_trending, is_active: validated.is_active, 
        batch_timings: validated.batch_timings, highlights: validated.highlights, 
        trending_tools: validated.trending_tools, modules: validated.modules, 
        brochure_url: validated.brochure_url, sort_order: validated.sort_order, 
        updated_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      if (error.code === "23505" || error.code === "23503") {
        return res.status(409).json({ error: "A course with this slug already exists." });
      }
      throw error;
    }

    res.status(201).json({ message: "Course created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const validated = courseSchema.partial().parse(req.body);

    if (Object.keys(validated).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    validated.updated_at = new Date().toISOString();

    const { data, error } = await db
      .from('courses')
      .update(validated)
      .eq('slug', slug)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ message: "Course updated successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { data, error } = await db
      .from('courses')
      .delete()
      .eq('slug', slug)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    next(err);
  }
};
