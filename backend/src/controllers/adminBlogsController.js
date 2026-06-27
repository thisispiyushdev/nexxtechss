import db from "../config/db.js";
import { z } from "zod";

const MAX_IMAGE_BYTES = 200 * 1024; // 200 KB

const blogSchema = z.object({
  id: z.string().min(1, "Blog ID (slug) is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  author: z.string().optional().default("NexxTechs"),
  date: z.string().min(1, "Date is required"),
  category: z.string().optional().default("Our blog"),
  read_time: z.string().optional().default("5 min read"),
  image: z.string().min(1, "Image is required").refine(
    (val) => {
      // Accept data URIs (base64 images) — check size
      if (val.startsWith("data:image/")) {
        const base64Part = val.split(",")[1] || "";
        const sizeInBytes = Math.ceil((base64Part.length * 3) / 4);
        return sizeInBytes <= MAX_IMAGE_BYTES;
      }
      // Also accept legacy URLs for backward compatibility
      return true;
    },
    { message: `Image must be under 200 KB. Please compress or resize the image.` }
  ),
  content: z.string().min(1, "Content is required"),
  is_active: z.boolean().optional().default(true),
});

export const getBlogs = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const validated = blogSchema.parse(req.body);

    const { data, error } = await db
      .from('blogs')
      .insert([{
        id: validated.id, title: validated.title, excerpt: validated.excerpt, 
        author: validated.author, date: validated.date, category: validated.category, 
        read_time: validated.read_time, image: validated.image, content: validated.content, 
        is_active: validated.is_active, updated_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      if (error.code === "23505" || error.code === "23503") {
        return res.status(409).json({ error: "A blog with this ID already exists." });
      }
      throw error;
    }

    res.status(201).json({ message: "Blog created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = blogSchema.partial().parse(req.body);

    if (Object.keys(validated).length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    validated.updated_at = new Date().toISOString();

    const { data, error } = await db
      .from('blogs')
      .update(validated)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.status(200).json({ message: "Blog updated successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await db
      .from('blogs')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    next(err);
  }
};
