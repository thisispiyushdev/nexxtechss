-- Run this SQL in your Supabase SQL Editor to add the transferred_from column

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS transferred_from TEXT;
ALTER TABLE brochure_leads ADD COLUMN IF NOT EXISTS transferred_from TEXT;
ALTER TABLE roadmap_leads ADD COLUMN IF NOT EXISTS transferred_from TEXT;
