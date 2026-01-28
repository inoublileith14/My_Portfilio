# Custom Analytics System Setup Guide

This document provides step-by-step instructions for setting up the custom analytics system for your Next.js portfolio.

## 📋 Prerequisites

- Next.js 16+ project
- Supabase account (free tier sufficient)
- Node.js 18+

## 🗄️ Database Setup

### 1. Run the Supabase Schema

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to execute the SQL

This will create:
- `page_views` table
- `click_events` table
- Required indexes
- Row Level Security policies

### 2. Get Your Service Role Key

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy your **Service Role Key** (keep this secret!)
3. This key is needed for the admin dashboard to read analytics data

## 🔐 Environment Variables

Create a `.env.local` file in your project root and add the following:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
# Get these from: https://supabase.com/dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service Role Key (for admin analytics - keep secret!)
# Get from: https://supabase.com/dashboard → Settings → API → Service Role Key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ============================================
# ADMIN AUTHENTICATION
# ============================================
# Hard-coded admin credentials (change these!)
ADMIN_EMAIL=admin@leithdev.com
ADMIN_PASSWORD=supersecurepassword

# Admin session secret (generate a random string)
# Use: openssl rand -base64 32
ADMIN_SESSION_SECRET=change-this-to-a-random-string-in-production

# ============================================
# AI CHATBOT CONFIGURATION (Optional)
# ============================================
# Choose ONE of the following AI providers:

# Option 1: Groq (Recommended - Free tier available)
# Get from: https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here

# Option 2: OpenRouter (Access to 300+ models)
# OPENROUTER_API_KEY=your_openrouter_api_key_here

# Option 3: Anthropic Claude ($5 free credit)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Option 4: OpenAI (Requires paid account)
# OPENAI_API_KEY=your_openai_api_key_here

# Option 5: AI Gateway (if available)
# AI_GATEWAY_API_KEY=your_ai_gateway_key_here

# Option 6: Google Gemini (Free tier, but has model issues)
# GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

# ============================================
# SITE CONFIGURATION
# ============================================
# Your site URL (used for admin auth checks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# For production: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**⚠️ Security Notes:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Change `ADMIN_PASSWORD` to a strong password
- Change `ADMIN_SESSION_SECRET` to a random string (use `openssl rand -base64 32`)
- The service role key bypasses RLS - keep it secret!
- For production, set these in your deployment platform (Vercel, etc.)

## 🚀 Installation

The analytics system is already integrated into your project. Just ensure:

1. **Dependencies are installed:**
   ```bash
   npm install recharts
   ```

2. **Database schema is set up** (see Database Setup above)

3. **Environment variables are configured** (see above)

## 📊 How It Works

### Automatic Tracking

The system automatically tracks:

1. **Page Views:**
   - Triggered on every route change
   - Captures: path, referrer, user agent
   - Excludes: admin pages, bots

2. **Click Events:**
   - Captures all clicks on the site
   - Records: path, element, mouse coordinates
   - Excludes: admin pages, bots

### Bot Detection

The system automatically filters out:
- Search engine crawlers (Google, Bing, etc.)
- Bots and scrapers
- Invalid user agents

### Rate Limiting

- Page views: 10 requests/minute per IP
- Click events: 50 requests/minute per IP

## 🔑 Admin Access

### Login

1. Navigate to `/admin` in your browser
2. Enter your admin credentials:
   - Email: `admin@leithdev.com` (or your `ADMIN_EMAIL`)
   - Password: `supersecurepassword` (or your `ADMIN_PASSWORD`)

### Dashboard Features

The admin dashboard shows:

- **Total Page Views** - Overall site traffic
- **Page Views by Path** - Which pages are most visited
- **Recent Clicks** - Last 100 click events
- **Most Clicked Elements** - Top interactive elements
- **7-Day Chart** - Visual trend of page views

### Logout

Click the "Logout" button in the top-right corner of the dashboard.

## 🛡️ Security Features

1. **Route Protection:**
   - `/admin` routes are protected by middleware
   - Unauthenticated users are redirected to login

2. **Session Management:**
   - Uses httpOnly cookies (not accessible via JavaScript)
   - Secure cookies in production
   - 7-day session expiration

3. **Data Privacy:**
   - No IP addresses stored
   - No personal information collected
   - Bot traffic filtered out

4. **Rate Limiting:**
   - Prevents abuse of tracking endpoints
   - In-memory rate limiting (use Redis in production)

## 📁 File Structure

```
app/
├── admin/
│   └── page.tsx              # Admin login & dashboard
├── api/
│   ├── admin/
│   │   ├── auth/route.ts     # Admin authentication
│   │   └── analytics/route.ts # Analytics data API
│   └── track/
│       ├── page-view/route.ts # Page view tracking
│       └── click/route.ts    # Click event tracking

components/
├── admin/
│   └── dashboard.tsx         # Admin dashboard UI
└── analytics/
    └── tracking-provider.tsx # Client-side tracking

lib/
├── admin/
│   └── auth.ts              # Admin auth utilities
├── analytics/
│   └── tracker.ts           # Tracking functions
└── supabase/
    └── admin.ts             # Admin Supabase client

middleware.ts                 # Route protection
supabase/schema.sql           # Database schema
```

## 🧪 Testing

### Test Page View Tracking

1. Visit any page on your site (not `/admin`)
2. Check Supabase Dashboard → Table Editor → `page_views`
3. You should see a new entry

### Test Click Tracking

1. Click anywhere on your site
2. Check Supabase Dashboard → Table Editor → `click_events`
3. You should see click events

### Test Admin Dashboard

1. Navigate to `/admin`
2. Login with your credentials
3. Verify analytics data is displayed

## 🚨 Troubleshooting

### "Missing SUPABASE_SERVICE_ROLE_KEY"

- Make sure you've added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Restart your dev server after adding environment variables

### "Unauthorized" when accessing admin

- Check that you're logged in
- Clear cookies and try logging in again
- Verify `ADMIN_SESSION_SECRET` is set

### No data in dashboard

- Verify tracking is working (check Supabase tables)
- Make sure you've visited pages and clicked elements
- Check browser console for errors

### Rate limit errors

- This is normal if you're testing rapidly
- Wait 1 minute and try again
- In production, consider using Redis for rate limiting

## 🔄 Production Considerations

1. **Use Redis for Rate Limiting:**
   - Current implementation uses in-memory storage
   - For production, use Redis or a proper rate limiting service

2. **Session Security:**
   - Change `ADMIN_SESSION_SECRET` to a strong random string
   - Use proper JWT tokens instead of simple base64 encoding

3. **Database Indexing:**
   - Indexes are already created in the schema
   - Monitor query performance as data grows

4. **Data Retention:**
   - Consider implementing data retention policies
   - Archive old analytics data periodically

5. **Monitoring:**
   - Monitor API endpoint performance
   - Set up alerts for unusual traffic patterns

## 📈 Performance

- **Tracking Impact:** Minimal - all tracking is async and non-blocking
- **Database Queries:** Optimized with indexes
- **Dashboard Load:** Fetches data on mount and refreshes every 30 seconds

## 🎯 Next Steps

- Customize dashboard UI to match your brand
- Add more analytics metrics (time on page, scroll depth, etc.)
- Implement data export functionality
- Add date range filtering
- Create email reports

## 📝 License

This analytics system is part of your portfolio project.

---

**Built with ❤️ for portfolio analytics**
