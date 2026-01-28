# Supabase Comments Setup

This project uses Supabase for the comments system. Follow these steps to set it up:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: Your project name
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
5. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## 3. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 4. Create the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## 5. Verify the Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see a `comments` table
3. The table should have the following columns:
   - `id` (uuid)
   - `post_slug` (text)
   - `author_name` (text)
   - `author_email` (text)
   - `content` (text)
   - `parent_id` (uuid, nullable)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## 6. Test the Comments

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to any blog post
3. Try posting a comment
4. Check your Supabase dashboard > Table Editor > comments to see the new comment

## Security Notes

- The current setup allows anyone to read and write comments (no authentication required)
- For production, consider:
  - Adding email verification
  - Implementing rate limiting
  - Adding moderation features
  - Using Supabase Auth for user authentication

## Troubleshooting

### "Invalid API key" error
- Make sure you're using the `anon` key, not the `service_role` key
- Verify the keys are correctly set in `.env.local`
- Restart your Next.js dev server after changing environment variables

### Comments not appearing
- Check the browser console for errors
- Verify the database schema was created correctly
- Check that Row Level Security policies are enabled
- Verify your Supabase project is active (not paused)

### Database connection issues
- Ensure your Supabase project is not paused
- Check your internet connection
- Verify the project URL is correct
