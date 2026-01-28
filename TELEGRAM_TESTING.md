# Testing Telegram Notifications on Windows

## Quick Test Commands

### Option 1: PowerShell (Recommended)

```powershell
# Test daily report
$headers = @{
    "Authorization" = "Bearer YOUR_CRON_SECRET"
}
Invoke-RestMethod -Uri "http://localhost:3000/api/notifications/daily-report" -Method POST -Headers $headers
```

Or use the provided script:
```powershell
.\test-daily-report.ps1
```

### Option 2: Using curl (if installed)

```powershell
curl.exe -X POST http://localhost:3000/api/notifications/daily-report -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Option 3: Without Authentication (for testing)

If you haven't set `CRON_SECRET`, you can temporarily remove the auth check or test without it:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/notifications/daily-report" -Method POST
```

## Understanding the Error

If you see `{"error":"Failed to send Telegram message"}`, this means:

✅ **Good news:** The API endpoint is working!
❌ **Issue:** Telegram bot is not configured yet

### To Fix:

1. **Set up Telegram bot** (see `TELEGRAM_SETUP.md`):
   - Create bot with @BotFather
   - Get your Chat ID from @userinfobot
   - Add to `.env.local`:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token
     TELEGRAM_CHAT_ID=your_chat_id
     ```

2. **Restart your dev server** after adding env variables:
   ```powershell
   npm run dev
   ```

3. **Test again** - you should now receive a Telegram message!

## Testing Comment Notifications

Comment notifications are automatic - just post a comment on any blog post and you'll receive a Telegram message (if configured).

## Troubleshooting

### "Failed to send Telegram message"

**Causes:**
- Missing `TELEGRAM_BOT_TOKEN` in `.env.local`
- Missing `TELEGRAM_CHAT_ID` in `.env.local`
- Invalid bot token
- Invalid chat ID
- Bot not started (send `/start` to your bot first)

**Fix:**
1. Check `.env.local` has both variables
2. Verify bot token: `https://api.telegram.org/bot<TOKEN>/getMe`
3. Make sure you sent `/start` to your bot
4. Restart dev server

### "Unauthorized" Error

**Cause:** Missing or incorrect `CRON_SECRET`

**Fix:**
- Add `CRON_SECRET` to `.env.local`
- Or temporarily comment out the auth check in the route for testing

### PowerShell Command Not Working

**Issue:** Multi-line commands don't work in PowerShell the same way as bash

**Solution:** Use single-line commands or the `.ps1` script file

## Example Successful Response

```json
{
  "success": true,
  "message": "Daily report sent successfully",
  "data": {
    "totalPageViews": 1234,
    "uniqueVisitors": 567,
    "totalClicks": 890
  }
}
```
