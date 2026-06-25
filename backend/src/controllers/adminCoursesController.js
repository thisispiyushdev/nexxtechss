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
    const { rows: data } = await db.query(
      "SELECT * FROM courses ORDER BY sort_order ASC"
    );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const validated = courseSchema.parse(req.body);

    const { rows: data } = await db.query(
      `INSERT INTO courses (slug, title, tagline, image, duration, level, overview, is_popular, is_trending, is_active, batch_timings, highlights, trending_tools, modules, brochure_url, sort_order, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW()) RETURNING *`,
      [
        validated.slug, validated.title, validated.tagline, validated.image,
        validated.duration, validated.level, validated.overview, validated.is_popular,
        validated.is_trending, validated.is_active, JSON.stringify(validated.batch_timings),
        JSON.stringify(validated.highlights), JSON.stringify(validated.trending_tools),
        JSON.stringify(validated.modules), validated.brochure_url, validated.sort_order
      ]
    );

    res.status(201).json({ message: "Course created successfully.", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    if (err.code === "23505") {
      return res.status(409).json({ error: "A course with this slug already exists." });
    }
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const validated = courseSchema.partial().parse(req.body);

    const fields = [];
    const values = [];
    let queryIndex = 1;

    for (const key of Object.keys(validated)) {
      fields.push(`${key} = $${queryIndex}`);
      let val = validated[key];
      // Array/Object data must be stringified for PostgreSQL JSONB columns typically
      if (Array.isArray(val) || typeof val === 'object') {
        val = JSON.stringify(val);
      }
      values.push(val);
      queryIndex++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    fields.push(`updated_at = NOW()`);
    values.push(slug);

    const query = `UPDATE courses SET ${fields.join(", ")} WHERE slug = $${queryIndex} RETURNING *`;
    const { rows: data } = await db.query(query, values);

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

    const { rowCount } = await db.query("DELETE FROM courses WHERE slug = $1", [slug]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    next(err);
  }
};
