-- ============================================
-- FIX RLS POLICIES FOR ANALYTICS TABLES
-- ============================================
-- Run this in Supabase SQL Editor to fix RLS policy issues

-- First, ensure tables exist (they should, but just in case)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  element TEXT NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on these tables
DO $$ 
BEGIN
  -- Drop all policies on page_views
  DROP POLICY IF EXISTS "Allow page view inserts" ON page_views;
  DROP POLICY IF EXISTS "Anyone can read comments" ON page_views;
  DROP POLICY IF EXISTS "Anyone can insert comments" ON page_views;
  
  -- Drop all policies on click_events
  DROP POLICY IF EXISTS "Allow click event inserts" ON click_events;
END $$;

-- Create policies that allow anonymous inserts
-- Using 'anon' role which is what the Supabase client uses
-- Also allow 'public' role as fallback
CREATE POLICY "Allow page view inserts"
  ON page_views
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

CREATE POLICY "Allow click event inserts"
  ON click_events
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- Alternative: If above doesn't work, try without role specification
-- (allows all roles by default)
DO $$
BEGIN
  -- Try creating without explicit roles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'page_views' 
    AND policyname = 'Allow page view inserts'
  ) THEN
    CREATE POLICY "Allow page view inserts_v2"
      ON page_views
      FOR INSERT
      WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'click_events' 
    AND policyname = 'Allow click event inserts'
  ) THEN
    CREATE POLICY "Allow click event inserts_v2"
      ON click_events
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Verify policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('page_views', 'click_events')
ORDER BY tablename, policyname;
