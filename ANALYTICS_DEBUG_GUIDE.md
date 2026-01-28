# Analytics System Debugging Guide

This guide helps you systematically debug why analytics data might not be appearing.

## 🔍 Debug Checklist

### 1. Client-Side Tracking

#### Verify Tracking Code Runs
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate to any page (not `/admin`)
4. Look for `[Analytics] Page view tracked: /path` messages
5. Click anywhere on the page
6. Look for `[Analytics] Click tracked:` messages

**If no messages appear:**
- Check that `TrackingProvider` is in your `app/layout.tsx`
- Verify you're not on `/admin` route
- Check browser console for errors

#### Verify Network Requests
1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Navigate to a page
4. Look for requests to `/api/track/page-view`
5. Click on the request and check:
   - Status should be `200 OK`
   - Response should be `{"success": true}`
   - Request payload should have `path`, `referrer`, `userAgent`

**If requests fail:**
- Check the Response tab for error messages
- Verify API route is accessible
- Check for CORS errors

### 2. API Routes

#### Test API Endpoints Directly

**Test Page View Tracking:**
```bash
curl -X POST http://localhost:3000/api/track/page-view \
  -H "Content-Type: application/json" \
  -d '{"path":"/test","referrer":"","userAgent":"Mozilla/5.0"}'
```

**Test Click Tracking:**
```bash
curl -X POST http://localhost:3000/api/track/click \
  -H "Content-Type: application/json" \
  -d '{"path":"/test","element":"BUTTON","x":100,"y":200}'
```

**Expected Response:**
```json
{"success": true, "id": "uuid-here"}
```

**If you get errors:**
- Check server console for detailed error logs
- Verify Supabase connection
- Check environment variables

### 3. Supabase Database

#### Verify Tables Exist
1. Go to Supabase Dashboard → Table Editor
2. Verify these tables exist:
   - `page_views`
   - `click_events`

#### Check Row Level Security (RLS)
1. Go to Supabase Dashboard → Authentication → Policies
2. For `page_views` table:
   - Should have "Allow page view inserts" policy
   - Policy should allow INSERT for all users
3. For `click_events` table:
   - Should have "Allow click event inserts" policy
   - Policy should allow INSERT for all users

**If RLS is blocking:**
- Run the schema SQL again
- Or manually create policies in Supabase Dashboard

#### Verify Data is Being Inserted
1. Go to Supabase Dashboard → Table Editor
2. Select `page_views` table
3. Check if new rows appear when you navigate pages
4. Select `click_events` table
5. Check if new rows appear when you click

**If no data appears:**
- Check server logs for Supabase errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check RLS policies allow inserts

### 4. Environment Variables

#### Verify All Required Variables
Check your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
ADMIN_EMAIL=admin@leithdev.com
ADMIN_PASSWORD=your_password
ADMIN_SESSION_SECRET=your_secret
```

**To verify they're loaded:**
1. Add temporary logging in `app/api/track/page-view/route.ts`:
   ```ts
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing')
   ```
2. Check server console output

**Important:** Restart dev server after changing `.env.local`!

### 5. Admin Dashboard

#### Verify Analytics API Works
1. Login to `/admin`
2. Open DevTools → Network tab
3. Look for request to `/api/admin/analytics`
4. Check response:
   - Should return JSON with analytics data
   - Status should be `200 OK`

**If you get 401:**
- You're not logged in
- Clear cookies and login again

**If you get 500:**
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Check server console for errors

#### Check Query Results
1. In admin dashboard, open browser console
2. Look for any error messages
3. Check if data is being fetched

### 6. Common Issues & Solutions

#### Issue: "Missing SUPABASE_SERVICE_ROLE_KEY"
**Solution:**
- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Get it from Supabase Dashboard → Settings → API → Service Role Key
- Restart dev server

#### Issue: "RLS policy violation"
**Solution:**
- Run `supabase/schema.sql` again
- Or manually enable inserts in Supabase Dashboard → Policies

#### Issue: "Rate limit exceeded"
**Solution:**
- You're testing too quickly
- Wait 1 minute and try again
- Or increase rate limits in API routes (for development)

#### Issue: No data in dashboard but data in Supabase
**Solution:**
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Verify admin analytics API route works
- Check browser console for errors

#### Issue: Tracking works but dashboard shows 0
**Solution:**
- Check admin analytics API response
- Verify service role key has read permissions
- Check if data exists in Supabase tables

### 7. Debug Mode

Enable detailed logging by setting in your code:
```ts
// In development, logs are automatically enabled
// Check browser console and server console
```

**Browser Console:**
- `[Analytics] Page view tracked: /path`
- `[Analytics] Click tracked: {...}`
- `[Analytics] Failed to track...` (errors)

**Server Console:**
- `[Analytics] Page view inserted: {...}`
- `[Analytics] Failed to insert page view: {...}` (errors)

### 8. Testing Checklist

- [ ] Navigate to homepage → Check console for tracking message
- [ ] Click a button → Check console for click tracking
- [ ] Check Network tab → Verify API requests are sent
- [ ] Check Supabase Dashboard → Verify data appears in tables
- [ ] Login to `/admin` → Verify dashboard loads
- [ ] Check dashboard shows data → Verify analytics API works
- [ ] Test real-time updates → Open dashboard in one tab, navigate site in another

## 🐛 Quick Debug Commands

**Check if tracking is working:**
```javascript
// In browser console
fetch('/api/track/page-view', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ path: '/test', referrer: '', userAgent: 'test' })
}).then(r => r.json()).then(console.log)
```

**Check if admin API works:**
```javascript
// In browser console (after logging in)
fetch('/api/admin/analytics', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)
```

## 📊 Expected Behavior

1. **Page Load:** Console shows `[Analytics] Page view tracked: /path`
2. **Click:** Console shows `[Analytics] Click tracked: {...}`
3. **Network:** Requests to `/api/track/*` return `200 OK`
4. **Supabase:** New rows appear in `page_views` and `click_events` tables
5. **Dashboard:** Shows totals, charts, and tables with data
6. **Real-time:** Dashboard updates automatically when new events occur

---

**Still having issues?** Check server logs and browser console for specific error messages.
