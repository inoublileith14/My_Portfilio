-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read comments
DROP POLICY IF EXISTS "Anyone can read comments" ON comments;
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert comments (you can add email validation later)
DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;
CREATE POLICY "Anyone can insert comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow users to update their own comments (optional - requires auth)
-- CREATE POLICY "Users can update own comments"
--   ON comments
--   FOR UPDATE
--   USING (auth.uid()::text = author_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ANALYTICS TABLES
-- ============================================

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT, -- Anonymized IP (e.g., 192.168.1.0)
  ip_hash TEXT, -- Hashed IP for privacy (one-way hash)
  country TEXT, -- Country name from geolocation
  country_code TEXT, -- ISO country code (e.g., US, ES)
  city TEXT, -- City name
  latitude DECIMAL(10, 8), -- Latitude for map
  longitude DECIMAL(11, 8), -- Longitude for map
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create click_events table
CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  element TEXT NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  ip_address TEXT, -- Anonymized IP (e.g., 192.168.1.0)
  ip_hash TEXT, -- Hashed IP for privacy (one-way hash)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_ip_hash ON page_views(ip_hash);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country_code);
CREATE INDEX IF NOT EXISTS idx_click_events_path ON click_events(path);
CREATE INDEX IF NOT EXISTS idx_click_events_element ON click_events(element);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_click_events_ip_hash ON click_events(ip_hash);

-- Enable Row Level Security (read-only for analytics)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts for tracking (public access)
-- Specify roles explicitly to ensure it works with anon key
DROP POLICY IF EXISTS "Allow page view inserts" ON page_views;
CREATE POLICY "Allow page view inserts"
  ON page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow click event inserts" ON click_events;
CREATE POLICY "Allow click event inserts"
  ON click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Note: Reading analytics data should be done server-side with service role key
-- No SELECT policies needed as we'll use service role for admin dashboard

-- ============================================
-- ENABLE REALTIME (for live analytics updates)
-- ============================================

-- Enable Realtime for analytics tables
-- Note: This requires Realtime to be enabled in your Supabase project
-- If the commands below fail, enable Realtime via Dashboard:
-- 1. Go to Database → Replication
-- 2. Find page_views and click_events tables
-- 3. Toggle "Enable Realtime" for both tables

DO $$
BEGIN
  -- Try to add tables to Realtime publication
  -- This will fail silently if Realtime is not enabled
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE page_views;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Realtime not enabled for page_views. Enable it in Dashboard → Database → Replication';
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE click_events;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Realtime not enabled for click_events. Enable it in Dashboard → Database → Replication';
  END;
END $$;
