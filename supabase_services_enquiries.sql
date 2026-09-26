-- ============================================================
-- NEXXTECHS SUPABASE SQL: SERVICE ENQUIRIES TABLE & POLICIES
-- Safe, Non-Destructive Script (Zero Warnings in Supabase Editor)
-- ============================================================

-- 1. Create extension for UUID generation if not existing
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Table for Service Enquiries
CREATE TABLE IF NOT EXISTS public.service_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_interested TEXT NOT NULL,
    message TEXT,
    branch TEXT DEFAULT 'Noida Sector 2 (+91 7987059430)',
    status TEXT DEFAULT 'pending',
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_service_enquiries_created_at ON public.service_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_status ON public.service_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_service ON public.service_enquiries(service_interested);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.service_enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Safe Policies (Creates policy only if missing - avoids DROP warnings)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'service_enquiries' 
        AND policyname = 'Allow public service enquiry inserts'
    ) THEN
        CREATE POLICY "Allow public service enquiry inserts" 
        ON public.service_enquiries FOR INSERT TO public WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'service_enquiries' 
        AND policyname = 'Allow authenticated users to select service enquiries'
    ) THEN
        CREATE POLICY "Allow authenticated users to select service enquiries" 
        ON public.service_enquiries FOR SELECT TO authenticated USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'service_enquiries' 
        AND policyname = 'Allow authenticated users to update service enquiries'
    ) THEN
        CREATE POLICY "Allow authenticated users to update service enquiries" 
        ON public.service_enquiries FOR UPDATE TO authenticated USING (true);
    END IF;
END $$;

-- 6. Trigger function for updating timestamp
CREATE OR REPLACE FUNCTION update_service_enquiries_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Safe Trigger Creation (Avoids DROP TRIGGER warning)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'trg_service_enquiries_timestamp'
    ) THEN
        CREATE TRIGGER trg_service_enquiries_timestamp
            BEFORE UPDATE ON public.service_enquiries
            FOR EACH ROW
            EXECUTE FUNCTION update_service_enquiries_timestamp();
    END IF;
END $$;
