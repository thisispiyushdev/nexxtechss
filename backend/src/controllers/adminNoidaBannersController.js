import { z } from "zod";
import db from "../config/db.js";

const MAX_IMAGE_BYTES = 150 * 1024; // 150 KB

const noidaBannerSchema = z.object({
  title: z.string().optional().default(""),
  link_url: z.string().optional().default(""),
  sort_order: z.number().int().optional().default(0),
  is_active: z.boolean().optional().default(true),
  image: z.string().min(1, "Image is required").refine(
    (val) => {
      if (!val || !val.startsWith("data:image/")) return true;
      const base64Length = val.split(",")[1]?.length || 0;
      const sizeInBytes = Math.ceil((base64Length * 3) / 4);
      return sizeInBytes <= MAX_IMAGE_BYTES;
    },
    { message: "Image must be under 150 KB. Please compress or resize the image." }
  )
});

const updateNoidaBannerSchema = z.object({
  title: z.string().optional(),
  link_url: z.string().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
  image: z.string().optional().refine(
    (val) => {
      if (!val || !val.startsWith("data:image/")) return true;
      const base64Length = val.split(",")[1]?.length || 0;
      const sizeInBytes = Math.ceil((base64Length * 3) / 4);
      return sizeInBytes <= MAX_IMAGE_BYTES;
    },
    { message: "Image must be under 150 KB. Please compress or resize the image." }
  )
});

// @desc    Get all noida image banners
// @route   GET /api/admin/noida-banners
// @access  Private (Core Admin)
export const getAllBanners = async (req, res) => {
  try {
    const { data, error } = await db.from('noida_banners').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching noida banners:", error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

// @desc    Create a new noida image banner
// @route   POST /api/admin/noida-banners
// @access  Private (Core Admin)
export const createBanner = async (req, res) => {
  try {
    const validated = noidaBannerSchema.parse(req.body);
    
    // Check total banners to restrict to 4
    const { count, error: countError } = await db.from('noida_banners').select('*', { count: 'exact', head: true });
    if (countError) throw countError;
    if (count >= 4) {
       return res.status(400).json({ error: "Maximum of 4 banners allowed for Noida page." });
    }

    const { data, error } = await db.from('noida_banners').insert([validated]).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Error creating noida banner:", error);
    res.status(500).json({ error: "Failed to create banner" });
  }
};

// @desc    Update a noida image banner
// @route   PUT /api/admin/noida-banners/:id
// @access  Private (Core Admin)
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const validated = updateNoidaBannerSchema.parse(req.body);
    validated.updated_at = new Date().toISOString();

    const { data, error } = await db.from('noida_banners').update(validated).eq('id', id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Error updating noida banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// @desc    Delete a noida image banner
// @route   DELETE /api/admin/noida-banners/:id
// @access  Private (Core Admin)
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await db.from('noida_banners').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting noida banner:", error);
    res.status(500).json({ error: "Failed to delete banner" });
  }
};
