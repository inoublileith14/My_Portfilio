# Test Telegram Bot Connection
# This script tests if your Telegram bot is configured correctly

Write-Host "`n🔍 Testing Telegram Bot Configuration...`n" -ForegroundColor Cyan

# Check environment variables
$botToken = $env:TELEGRAM_BOT_TOKEN
$chatId = $env:TELEGRAM_CHAT_ID

if (-not $botToken) {
    Write-Host "❌ TELEGRAM_BOT_TOKEN is not set in environment" -ForegroundColor Red
    Write-Host "   Add it to .env.local and restart your dev server" -ForegroundColor Yellow
    exit 1
}

if (-not $chatId) {
    Write-Host "❌ TELEGRAM_CHAT_ID is not set in environment" -ForegroundColor Red
    Write-Host "   Add it to .env.local and restart your dev server" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Bot Token: $($botToken.Substring(0, 10))..." -ForegroundColor Green
Write-Host "✅ Chat ID: $chatId`n" -ForegroundColor Green

# Test 1: Check if bot token is valid
Write-Host "Test 1: Validating bot token..." -ForegroundColor Cyan
try {
    $botInfo = Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getMe"
    Write-Host "✅ Bot is valid: @$($botInfo.result.username)" -ForegroundColor Green
    Write-Host "   Bot Name: $($botInfo.result.first_name)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Invalid bot token!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   Get a new token from @BotFather" -ForegroundColor Yellow
    exit 1
}

# Test 2: Send a test message
Write-Host "`nTest 2: Sending test message..." -ForegroundColor Cyan
try {
    $message = "🧪 Test message from your portfolio bot!`n`nIf you see this, your bot is working correctly! ✅"
    $body = @{
        chat_id = $chatId
        text = $message
        parse_mode = "HTML"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/sendMessage" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body

    Write-Host "✅ Test message sent successfully!" -ForegroundColor Green
    Write-Host "   Check your Telegram - you should see the test message" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to send message!" -ForegroundColor Red
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($errorResponse) {
        Write-Host "   Error: $($errorResponse.description)" -ForegroundColor Yellow
        if ($errorResponse.description -like "*chat not found*") {
            Write-Host "`n💡 Solution:" -ForegroundColor Cyan
            Write-Host "   1. Make sure you sent /start to your bot" -ForegroundColor White
            Write-Host "   2. Check that Chat ID is correct: $chatId" -ForegroundColor White
            Write-Host "   3. Try getting your Chat ID again from @userinfobot" -ForegroundColor White
        }
    } else {
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    exit 1
}

Write-Host "`n✅ All tests passed! Your Telegram bot is configured correctly." -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "   1. Test the daily report: .\test-daily-report.ps1" -ForegroundColor White
Write-Host "   2. Post a comment on your blog to test comment notifications" -ForegroundColor White
