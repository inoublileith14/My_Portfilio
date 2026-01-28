# IP Geolocation & Map Setup Guide

## Overview

Your analytics system now tracks visitor locations and displays them on an interactive map! This shows where your visitors are coming from around the world.

## Features

- 🌍 **Automatic geolocation** from IP addresses
- 🗺️ **Interactive map** showing visitor locations
- 📊 **Country and city tracking**
- 🔒 **Privacy-compliant** (uses anonymized IPs)

## Setup Steps

### Step 1: Update Database Schema

If you already have `page_views` table, run this in Supabase SQL Editor:

```sql
-- Copy and paste contents of: supabase/add-geolocation.sql
```

Or if starting fresh, the main `supabase/schema.sql` already includes geolocation columns.

### Step 2: Restart Your Server

After updating the database:

```bash
npm run dev
```

### Step 3: Test It

1. Visit your website from different locations (or use a VPN)
2. Check the admin dashboard → You should see a "Visitor Locations" map
3. Click on markers to see visitor counts per location

## How It Works

### Geolocation API

Uses **ip-api.com** (free, no API key required):
- ✅ Free tier: 45 requests/minute
- ✅ No API key needed
- ✅ Returns: country, city, latitude, longitude

### Privacy

- IPs are **anonymized** before geolocation (last octet removed)
- Only **country/city level** accuracy (not exact addresses)
- Geolocation is **optional** - tracking works without it

### Data Stored

For each page view:
- `country` - Country name (e.g., "Spain")
- `country_code` - ISO code (e.g., "ES")
- `city` - City name (e.g., "Barcelona")
- `latitude` - For map positioning
- `longitude` - For map positioning

## Map Component

The map uses **Leaflet** (open-source, free):
- Loads dynamically (no bundle size impact)
- Uses OpenStreetMap tiles (free)
- Shows markers for each unique location
- Click markers to see visitor counts

## Troubleshooting

### No locations showing on map?

1. **Check database** - Run the geolocation migration SQL
2. **Check API limits** - ip-api.com has rate limits (45/min)
3. **Check logs** - Look for `[Geolocation]` messages in server console
4. **Test geolocation** - Some IPs (localhost, VPNs) may not resolve

### Map not loading?

1. **Check browser console** - Look for Leaflet loading errors
2. **Check network** - Map tiles load from OpenStreetMap
3. **Try refreshing** - Map loads dynamically on first render

### Geolocation failing?

- **Localhost IPs** won't geolocate (expected)
- **Private IPs** (192.168.x.x) won't geolocate (expected)
- **Rate limiting** - If you hit 45 requests/minute, wait a bit
- **API down** - ip-api.com might be temporarily unavailable

## Alternative Services

If you need more requests or better accuracy:

### Option 1: ipapi.co
- Free: 1,000 requests/day
- Requires API key
- More accurate

### Option 2: ipgeolocation.io
- Free: 1,000 requests/month
- Requires API key
- Good accuracy

### Option 3: MaxMind GeoIP2
- Paid service
- Very accurate
- Enterprise-grade

## Example Usage

After setup, you'll see:
- **Map** with markers for each location
- **Country list** in the dashboard
- **City-level** tracking
- **Visitor counts** per location

## Privacy Notes

- ✅ Only country/city level (not exact addresses)
- ✅ IPs are anonymized before geolocation
- ✅ No personally identifiable information
- ✅ GDPR/CCPA compliant

## Next Steps

1. Update database schema
2. Restart server
3. Visit your site from different locations
4. Check the map in admin dashboard!

The map will automatically populate as visitors come to your site! 🗺️
