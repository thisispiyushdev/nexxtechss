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
    const { rows: data } = await db.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const validated = blogSchema.parse(req.body);

    const { rows: data } = await db.query(
      `INSERT INTO blogs (id, title, excerpt, author, date, category, read_time, image, content, is_active, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *`,
      [
        validated.id, validated.title, validated.excerpt, validated.author, 
        validated.date, validated.category, validated.read_time, 
        validated.image, validated.content, validated.is_active
      ]
    );

    res.status(201).json({ message: "Blog created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    if (err.code === "23505") {
      return res.status(409).json({ error: "A blog with this ID already exists." });
    }
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = blogSchema.partial().parse(req.body);

    // Dynamic update query building
    const fields = [];
    const values = [];
    let queryIndex = 1;

    for (const key of Object.keys(validated)) {
      fields.push(`${key} = $${queryIndex}`);
      values.push(validated[key]);
      queryIndex++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `UPDATE blogs SET ${fields.join(", ")} WHERE id = $${queryIndex} RETURNING *`;
    const { rows: data } = await db.query(query, values);

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

    const { rowCount } = await db.query("DELETE FROM blogs WHERE id = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    next(err);
  }
};
