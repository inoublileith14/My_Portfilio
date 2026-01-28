-- ============================================
-- ADD IP TRACKING TO EXISTING TABLES
-- ============================================
-- Run this if you already have page_views and click_events tables
-- This adds IP tracking columns without losing existing data

-- Add IP columns to page_views (if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE page_views ADD COLUMN ip_address TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'ip_hash'
  ) THEN
    ALTER TABLE page_views ADD COLUMN ip_hash TEXT;
  END IF;
END $$;

-- Add IP columns to click_events (if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'click_events' AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE click_events ADD COLUMN ip_address TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'click_events' AND column_name = 'ip_hash'
  ) THEN
    ALTER TABLE click_events ADD COLUMN ip_hash TEXT;
  END IF;
END $$;

-- Create indexes for IP queries
CREATE INDEX IF NOT EXISTS idx_page_views_ip_hash ON page_views(ip_hash);
CREATE INDEX IF NOT EXISTS idx_click_events_ip_hash ON click_events(ip_hash);

-- Verify columns were added
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name IN ('page_views', 'click_events')
  AND column_name IN ('ip_address', 'ip_hash')
ORDER BY table_name, column_name;
