-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Contact / Enquiry Form
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_interested TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Protect enquiries table with row level security if needed
-- (Disabled by default so public API can insert without authentication. 
-- In production with actual users you may want to enable it and set policies).

-- Table for Brochure Downloads
CREATE TABLE IF NOT EXISTS public.brochure_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    course TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Roadmap Leads
CREATE TABLE IF NOT EXISTS public.roadmap_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_interested TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create simple policies to allow public inserts
-- This is necessary IF you choose to enable Row Level Security (RLS) on these tables later.

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public inserts" ON public.enquiries;
CREATE POLICY "Allow public inserts" ON public.enquiries FOR INSERT TO public WITH CHECK (true);

ALTER TABLE public.brochure_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public inserts" ON public.brochure_leads;
CREATE POLICY "Allow public inserts" ON public.brochure_leads FOR INSERT TO public WITH CHECK (true);

ALTER TABLE public.roadmap_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public inserts" ON public.roadmap_leads;
CREATE POLICY "Allow public inserts" ON public.roadmap_leads FOR INSERT TO public WITH CHECK (true);

-- ============================================================
-- ADMIN PANEL TABLES (Added for content management)
-- ============================================================

-- Placement reviews (success stories)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    image TEXT DEFAULT '',
    text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Placement stats
CREATE TABLE IF NOT EXISTS public.placement_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    value INT NOT NULL,
    suffix TEXT DEFAULT '+',
    icon TEXT DEFAULT 'Users',
    sort_order INT DEFAULT 0
);

-- Blog posts
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT DEFAULT 'NexxTechs',
    date TEXT NOT NULL,
    category TEXT DEFAULT 'Our blog',
    read_time TEXT DEFAULT '5 min read',
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    image TEXT DEFAULT '',
    duration TEXT NOT NULL,
    level TEXT NOT NULL,
    overview TEXT NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    batch_timings JSONB DEFAULT '[]',
    highlights JSONB DEFAULT '[]',
    trending_tools JSONB DEFAULT '[]',
    modules JSONB DEFAULT '[]',
    brochure_url TEXT DEFAULT '',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- RLS POLICIES FOR ADMIN TABLES
-- ============================================================

-- Reviews: public can read active reviews, backend service handles writes
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.reviews;
CREATE POLICY "Allow public read" ON public.reviews FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public inserts" ON public.reviews;
CREATE POLICY "Allow public inserts" ON public.reviews FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update" ON public.reviews;
CREATE POLICY "Allow public update" ON public.reviews FOR UPDATE TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.reviews;
CREATE POLICY "Allow public delete" ON public.reviews FOR DELETE TO public USING (true);

-- Placement stats
ALTER TABLE public.placement_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.placement_stats;
CREATE POLICY "Allow public read" ON public.placement_stats FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public inserts" ON public.placement_stats;
CREATE POLICY "Allow public inserts" ON public.placement_stats FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update" ON public.placement_stats;
CREATE POLICY "Allow public update" ON public.placement_stats FOR UPDATE TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.placement_stats;
CREATE POLICY "Allow public delete" ON public.placement_stats FOR DELETE TO public USING (true);

-- Blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.blogs;
CREATE POLICY "Allow public read" ON public.blogs FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public inserts" ON public.blogs;
CREATE POLICY "Allow public inserts" ON public.blogs FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update" ON public.blogs;
CREATE POLICY "Allow public update" ON public.blogs FOR UPDATE TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.blogs;
CREATE POLICY "Allow public delete" ON public.blogs FOR DELETE TO public USING (true);

-- Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.courses;
CREATE POLICY "Allow public read" ON public.courses FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public inserts" ON public.courses;
CREATE POLICY "Allow public inserts" ON public.courses FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update" ON public.courses;
CREATE POLICY "Allow public update" ON public.courses FOR UPDATE TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.courses;
CREATE POLICY "Allow public delete" ON public.courses FOR DELETE TO public USING (true);

-- Allow public SELECT on existing lead tables (needed for admin panel reads)
DROP POLICY IF EXISTS "Allow public read" ON public.enquiries;
CREATE POLICY "Allow public read" ON public.enquiries FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.enquiries;
CREATE POLICY "Allow public delete" ON public.enquiries FOR DELETE TO public USING (true);

DROP POLICY IF EXISTS "Allow public read" ON public.brochure_leads;
CREATE POLICY "Allow public read" ON public.brochure_leads FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.brochure_leads;
CREATE POLICY "Allow public delete" ON public.brochure_leads FOR DELETE TO public USING (true);

DROP POLICY IF EXISTS "Allow public read" ON public.roadmap_leads;
CREATE POLICY "Allow public read" ON public.roadmap_leads FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.roadmap_leads;
CREATE POLICY "Allow public delete" ON public.roadmap_leads FOR DELETE TO public USING (true);

-- Promotional Banners
CREATE TABLE IF NOT EXISTS public.promotional_banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    link_url TEXT DEFAULT '',
    link_text TEXT DEFAULT '',
    bg_color TEXT DEFAULT '#84CC16',
    text_color TEXT DEFAULT '#000000',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.promotional_banners;
CREATE POLICY "Allow public read" ON public.promotional_banners FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public inserts" ON public.promotional_banners;
CREATE POLICY "Allow public inserts" ON public.promotional_banners FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update" ON public.promotional_banners;
CREATE POLICY "Allow public update" ON public.promotional_banners FOR UPDATE TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON public.promotional_banners;
CREATE POLICY "Allow public delete" ON public.promotional_banners FOR DELETE TO public USING (true);

-- ============================================================
-- ADMINS TABLE (For role based access)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('core', 'counselor', 'noida_counselor')),
    display_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for admins" ON public.admins;
CREATE POLICY "Allow all for admins" ON public.admins FOR ALL TO public USING (true) WITH CHECK (true);
