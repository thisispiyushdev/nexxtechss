-- Run this SQL in your Supabase SQL Editor to add the counselor_id column to leads tables

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS counselor_id UUID REFERENCES admins(id);
ALTER TABLE brochure_leads ADD COLUMN IF NOT EXISTS counselor_id UUID REFERENCES admins(id);
ALTER TABLE roadmap_leads ADD COLUMN IF NOT EXISTS counselor_id UUID REFERENCES admins(id);
