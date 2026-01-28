# Telegram Notifications Setup Guide

Get instant notifications on Telegram for:
- 📊 **Daily Analytics Reports** (sent every morning)
- 💬 **New Comments** (when someone comments on your blog)
- 📧 **New Emails** (if you add email monitoring later)

## Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the instructions:
   - Choose a name for your bot (e.g., "Leith Portfolio Bot")
   - Choose a username (must end with `bot`, e.g., `leith_portfolio_bot`)
4. **Save the bot token** - you'll need it in Step 3

## Step 2: Get Your Chat ID

1. Search for **@userinfobot** on Telegram
2. Send `/start` command
3. The bot will reply with your **Chat ID** (a number like `123456789`)
4. **Save this Chat ID** - you'll need it in Step 3

## Step 3: Add to Environment Variables

Add these to your `.env.local`:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_CHAT_ID=your_chat_id_from_userinfobot

# Optional: Protect cron endpoint (recommended for production)
CRON_SECRET=your-random-secret-here
```

**Generate CRON_SECRET:**
```bash
# PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use: openssl rand -base64 32
```

## Step 4: Test the Setup

### Test Comment Notification

1. Post a comment on any blog post
2. You should receive a Telegram message immediately

### Test Daily Report (Manual)

```bash
# Using curl
curl -X POST http://localhost:3000/api/notifications/daily-report \
  -H "Authorization: Bearer your-cron-secret"

# Or using PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/notifications/daily-report" `
  -Method POST `
  -Headers @{ "Authorization" = "Bearer your-cron-secret" }
```

## Step 5: Set Up Daily Reports (Cron Job)

### Option A: Vercel (Recommended)

If deploying on Vercel, the `vercel.json` file is already configured. Just make sure:
1. Your project is deployed on Vercel
2. `CRON_SECRET` is set in Vercel environment variables
3. The cron job will run automatically at 11 PM UTC (23:00) daily

### Option B: GitHub Actions

Create `.github/workflows/daily-report.yml`:

```yaml
name: Daily Analytics Report

on:
  schedule:
    - cron: '0 23 * * *' # 11 PM UTC (23:00) daily
  workflow_dispatch: # Allow manual trigger

jobs:
  send-report:
    runs-on: ubuntu-latest
    steps:
      - name: Send Daily Report
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/notifications/daily-report \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

Add secrets in GitHub: Settings → Secrets → Actions

### Option C: External Cron Service

Use services like:
- **cron-job.org** (free)
- **EasyCron** (free tier)
- **UptimeRobot** (free)

Set up a cron job to call:
```
POST https://yourdomain.com/api/notifications/daily-report
Authorization: Bearer your-cron-secret
```

## What You'll Receive

### Daily Report (11 PM UTC / 23:00)
```
📊 Daily Analytics Report
📅 2024-01-15

👁️ Page Views: 1,234
👥 Unique Visitors: 567
🖱️ Total Clicks: 890

Top Pages:
1. /: 450 views
2. /blog: 320 views
3. /resume: 180 views
```

### Comment Notification (Instant)
```
💬 New Comment Received

👤 Author: John Doe
📧 Email: john@example.com
📝 Post: Building Scalable Systems

Comment:
Great article! I found the section about...

🔗 View Comment
```

## Troubleshooting

### Not receiving notifications?

1. **Check environment variables:**
   ```bash
   # Verify they're set
   echo $TELEGRAM_BOT_TOKEN
   echo $TELEGRAM_CHAT_ID
   ```

2. **Test bot token:**
   ```bash
   curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe"
   ```

3. **Test sending a message:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
     -d "chat_id=<YOUR_CHAT_ID>" \
     -d "text=Test message"
   ```

4. **Check server logs:**
   - Look for `[Telegram]` in your console
   - Check for error messages

### Bot not responding?

- Make sure you **started a conversation** with your bot
- Send `/start` to your bot first
- Verify the Chat ID is correct

### Daily report not running?

- Check cron job is configured correctly
- Verify `CRON_SECRET` matches in both places
- Check Vercel/GitHub Actions logs

## Security Notes

- ✅ **Never commit** `.env.local` to git
- ✅ Use `CRON_SECRET` to protect cron endpoints
- ✅ Bot token is safe to use (it's designed for this)
- ✅ Chat ID is private - don't share it

## Future Enhancements

You can extend this system to:
- 📧 Monitor email inbox (using email parsing service)
- 🔔 Send alerts for high traffic spikes
- 📈 Weekly/monthly summary reports
- 🚨 Error notifications
- 💰 Revenue tracking (if applicable)

## Support

If you need help:
1. Check Telegram Bot API docs: https://core.telegram.org/bots/api
2. Test your bot token with BotFather: `/token` command
3. Check server logs for detailed error messages
