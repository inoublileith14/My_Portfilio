# Real-Time Analytics Setup Guide

This guide explains how to enable real-time updates for the analytics dashboard.

## 🚀 Quick Setup

### Step 1: Enable Realtime in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Database** → **Replication**
4. Find the following tables:
   - `page_views`
   - `click_events`
5. Toggle **"Enable Realtime"** for both tables
6. Click **Save**

### Step 2: Verify Realtime is Working

1. Open your admin dashboard at `/admin`
2. Look for the **"Live"** indicator in the top-right (green dot = connected)
3. Open your site in another browser tab
4. Navigate to different pages or click elements
5. Watch the dashboard update in real-time! 🎉

## 🔍 Troubleshooting

### "Offline" Status

If you see "Offline" instead of "Live":

1. **Check Realtime is enabled:**
   - Go to Supabase Dashboard → Database → Replication
   - Verify both tables have Realtime enabled

2. **Check browser console:**
   - Open DevTools → Console
   - Look for Realtime connection errors
   - Check for WebSocket connection issues

3. **Check environment variables:**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` is set
   - Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

4. **Check network:**
   - Ensure WebSocket connections aren't blocked
   - Check firewall/proxy settings

### Realtime Not Updating

If Realtime is connected but not updating:

1. **Verify data is being inserted:**
   - Check Supabase Dashboard → Table Editor
   - Verify new rows appear when you interact with the site

2. **Check RLS policies:**
   - Realtime requires proper RLS policies
   - Ensure insert policies allow anonymous access

3. **Check browser console:**
   - Look for subscription errors
   - Check for permission errors

## 📊 How It Works

1. **Client-side tracking** sends events to API routes
2. **API routes** insert data into Supabase
3. **Supabase Realtime** broadcasts INSERT events
4. **Admin dashboard** subscribes to Realtime channels
5. **Dashboard updates** automatically when new events arrive

## 🎯 Features

- **Live Indicator:** Shows connection status
- **Real-time Counters:** Updates as events arrive
- **Automatic Refresh:** Full data refresh every 60 seconds
- **Graceful Degradation:** Falls back to polling if Realtime fails

## 🔒 Security

- Realtime uses **anon key** (not service role)
- RLS policies control access
- Only INSERT events are subscribed (no UPDATE/DELETE)
- Admin dashboard requires authentication

---

**Need help?** See [ANALYTICS_DEBUG_GUIDE.md](ANALYTICS_DEBUG_GUIDE.md) for detailed debugging steps.
