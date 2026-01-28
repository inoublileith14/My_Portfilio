# PowerShell script to test daily report endpoint
# Usage: .\test-daily-report.ps1

$url = "http://localhost:3000/api/notifications/daily-report"

# Try to get CRON_SECRET from environment, or use the one below
$cronSecret = $env:CRON_SECRET
if (-not $cronSecret) {
    # If not in env, you can set it here or it will try without auth
    $cronSecret = "A01yVwL8opjKxeiWYZmMBnFIRg69d53PhNk7vs2HSXJUOutDElfazQbG4CTqcr"
    Write-Host "⚠️  Using hardcoded secret. Set CRON_SECRET in .env.local to match." -ForegroundColor Yellow
}

# Build headers - only add auth if secret is provided
$headers = @{
    "Content-Type" = "application/json"
}

if ($cronSecret) {
    $headers["Authorization"] = "Bearer $cronSecret"
    Write-Host "Using Authorization header with CRON_SECRET" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  No CRON_SECRET provided - request may fail if CRON_SECRET is set in .env.local" -ForegroundColor Yellow
}

try {
    Write-Host "`nSending request to $url..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri $url -Method POST -Headers $headers
    
    Write-Host "`n✅ Success!" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 10)
    
    if ($response.telegramSent -eq $false) {
        Write-Host "`n⚠️  Telegram notification failed. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local" -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        
        Write-Host "Status Code: $statusCode" -ForegroundColor Yellow
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
        
        if ($statusCode -eq 401) {
            Write-Host "`n💡 Tip: 401 Unauthorized means CRON_SECRET doesn't match." -ForegroundColor Cyan
            Write-Host "   Option 1: Remove CRON_SECRET from .env.local (for testing)" -ForegroundColor Cyan
            Write-Host "   Option 2: Update the secret in this script to match .env.local" -ForegroundColor Cyan
            Write-Host "   Option 3: Set CRON_SECRET environment variable before running" -ForegroundColor Cyan
        }
    }
}
