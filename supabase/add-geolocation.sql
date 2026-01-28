-- ============================================
-- ADD GEOLOCATION COLUMNS TO EXISTING TABLES
-- ============================================
-- Run this if you already have page_views table
-- This adds geolocation columns without losing existing data

-- Add geolocation columns to page_views (if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'country'
  ) THEN
    ALTER TABLE page_views ADD COLUMN country TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'country_code'
  ) THEN
    ALTER TABLE page_views ADD COLUMN country_code TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'city'
  ) THEN
    ALTER TABLE page_views ADD COLUMN city TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'latitude'
  ) THEN
    ALTER TABLE page_views ADD COLUMN latitude DECIMAL(10, 8);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'page_views' AND column_name = 'longitude'
  ) THEN
    ALTER TABLE page_views ADD COLUMN longitude DECIMAL(11, 8);
  END IF;
END $$;

-- Create index for country queries
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country_code);

-- Verify columns were added
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'page_views'
  AND column_name IN ('country', 'country_code', 'city', 'latitude', 'longitude')
ORDER BY column_name;
