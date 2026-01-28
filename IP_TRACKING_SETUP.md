# IP Tracking Setup Guide

## Overview

Your analytics system now tracks IP addresses with **privacy protection** built-in. IPs are:
- **Anonymized**: Last octet removed (e.g., `192.168.1.123` → `192.168.1.0`)
- **Hashed**: One-way SHA-256 hash for unique visitor counting
- **GDPR/CCPA Compliant**: No personally identifiable information stored

## Setup Steps

### 1. Update Database Schema

If you already have `page_views` and `click_events` tables, run:

```sql
-- In Supabase Dashboard → SQL Editor
-- Copy and paste contents of: supabase/add-ip-tracking.sql
```

Or if starting fresh, the main `supabase/schema.sql` already includes IP columns.

### 2. Configure IP Hash Salt (Optional but Recommended)

Add to your `.env.local`:

```bash
# Generate a random salt
# PowerShell: [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
# Or use: openssl rand -base64 32

IP_HASH_SALT=your-random-salt-here
```

**Why?** The salt ensures your IP hashes are unique to your application. Without it, the system uses a default salt (less secure).

### 3. Restart Your Server

After updating `.env.local`, restart your Next.js dev server:

```bash
npm run dev
```

## What Gets Tracked

### Stored Data:
- **`ip_address`**: Anonymized IP (e.g., `192.168.1.0`)
- **`ip_hash`**: Hashed IP for unique visitor counting (e.g., `a3f5b2c1d4e6f7g8`)

### What You Can Do:
- ✅ Count unique visitors (by `ip_hash`)
- ✅ See IP ranges/regions (by `ip_address` prefix)
- ✅ Detect suspicious activity patterns
- ❌ Cannot identify individual users
- ❌ Cannot reverse-hash to get real IPs

## Privacy Compliance

### GDPR (EU)
- ✅ IPs are anonymized (not personally identifiable)
- ✅ One-way hashing prevents re-identification
- ✅ Consider adding to your privacy policy: "We collect anonymized IP addresses for analytics"

### CCPA (California)
- ✅ No personal information stored
- ✅ Anonymized data is not considered "personal information" under CCPA

### Best Practices
1. **Add to Privacy Policy**: Mention IP tracking for analytics
2. **Cookie Consent**: Not required (no cookies used)
3. **Data Retention**: Consider purging old IP data periodically

## Dashboard Features

After setup, your admin dashboard will show:

1. **Unique Visitors**: Counted by hashed IP
2. **Top IP Ranges**: Shows anonymized IP prefixes (e.g., `192.168.x.x`)
3. **Privacy-Safe Analytics**: No way to identify individual users

## Troubleshooting

### IPs showing as "unknown"
- Check that your server is receiving `x-forwarded-for` or `x-real-ip` headers
- If behind a proxy/CDN, ensure headers are forwarded correctly

### No unique visitors showing
- Verify `ip_hash` column exists in database
- Check that IP tracking is working (see server logs)

### Want to disable IP tracking?
Simply don't use the IP columns - the system will work fine without them.

## Example Queries

### Count unique visitors today:
```sql
SELECT COUNT(DISTINCT ip_hash) 
FROM page_views 
WHERE DATE(created_at) = CURRENT_DATE;
```

### Top IP ranges:
```sql
SELECT 
  ip_address,
  COUNT(*) as views
FROM page_views
WHERE ip_address IS NOT NULL
GROUP BY ip_address
ORDER BY views DESC
LIMIT 10;
```

## Security Notes

- **Never log full IPs** in production
- **Rotate IP_HASH_SALT** periodically if compromised
- **Consider rate limiting** by IP hash to prevent abuse
- **Purge old data** regularly to comply with data retention policies
