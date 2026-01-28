# Telegram Notifications Troubleshooting

## Your Chat ID
Your Chat ID is: **6249990595**

## Common Issues & Solutions

### Issue 1: Not Receiving Messages

**Checklist:**
1. ✅ **Bot Token** is set in `.env.local`:
   ```bash
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

2. ✅ **Chat ID** is set in `.env.local`:
   ```bash
   TELEGRAM_CHAT_ID=6249990595
   ```

3. ✅ **You sent `/start` to your bot**:
   - Open Telegram
   - Search for your bot (the one you created with @BotFather)
   - Send `/start` command
   - This is REQUIRED - the bot can't message you until you start it!

4. ✅ **Restarted dev server** after adding env variables:
   ```powershell
   # Stop server (Ctrl+C) and restart:
   npm run dev
   ```

### Issue 2: "Chat not found" Error

**Cause:** You haven't started the bot conversation.

**Solution:**
1. Open Telegram
2. Search for your bot (the username you created with @BotFather)
3. Click on it
4. Send `/start`
5. Now try sending a test message again

### Issue 3: "Invalid bot token" Error

**Cause:** Wrong or expired bot token.

**Solution:**
1. Go to @BotFather on Telegram
2. Send `/token`
3. Select your bot
4. Copy the new token
5. Update `.env.local`:
   ```bash
   TELEGRAM_BOT_TOKEN=new_token_here
   ```
6. Restart dev server

### Issue 4: Bot Token Not Loading

**Cause:** Environment variables not loaded.

**Solution:**
1. Make sure `.env.local` is in the project root (same folder as `package.json`)
2. Restart dev server completely (stop and start again)
3. Check server logs for errors

## Testing Your Setup

### Step 1: Test Bot Connection

Run the test script:
```powershell
.\test-telegram.ps1
```

This will:
- ✅ Check if bot token is valid
- ✅ Check if chat ID is set
- ✅ Send a test message

### Step 2: Test Daily Report

```powershell
.\test-daily-report.ps1
```

### Step 3: Test Comment Notification

1. Go to any blog post on your site
2. Post a comment
3. You should receive a Telegram notification immediately

## Quick Verification

### Check Your .env.local File

Make sure you have:
```bash
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=6249990595
```

**Important:** 
- No quotes around the values
- No spaces around the `=`
- Restart server after changes

### Verify Bot Token

Test your bot token directly:
```powershell
$token = "YOUR_BOT_TOKEN"
Invoke-RestMethod "https://api.telegram.org/bot$token/getMe"
```

Should return bot info if token is valid.

### Verify Chat ID

Your Chat ID from the screenshot: **6249990595**

Make sure it matches exactly in `.env.local` (no spaces, no quotes).

## Still Not Working?

1. **Check server logs** - Look for `[Telegram]` messages
2. **Test manually** - Use the test script
3. **Verify bot** - Make sure you can see your bot in Telegram
4. **Check permissions** - Make sure bot can send messages to you

## Example Working Configuration

```bash
# .env.local
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=6249990595
```

After setting these:
1. Save the file
2. Restart dev server: `npm run dev`
3. Run test: `.\test-telegram.ps1`
