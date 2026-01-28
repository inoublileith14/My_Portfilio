-- ============================================
-- TEMPORARY FIX: Disable RLS for Analytics Tables
-- ============================================
-- WARNING: This disables RLS completely for these tables
-- Only use this if policies aren't working
-- For production, you should use proper RLS policies

-- Disable RLS temporarily to test
ALTER TABLE page_views DISABLE ROW LEVEL SECURITY;
ALTER TABLE click_events DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('page_views', 'click_events')
AND schemaname = 'public';

-- If you want to re-enable RLS later with proper policies:
-- ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
-- Then create the policies again
