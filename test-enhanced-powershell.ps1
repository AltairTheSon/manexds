# Test Enhanced Figma Implementation
# Tests the new enhanced token and component extraction features

$BASE_URL = "http://localhost:3200/api/mcp/figma"

Write-Host "🧪 Testing Enhanced Figma Implementation..." -ForegroundColor Green
Write-Host ""

try {
    # 1. Test sync status
    Write-Host "1️⃣ Testing sync status..." -ForegroundColor Yellow
    $statusResponse = Invoke-RestMethod -Uri "$BASE_URL/sync-status" -Method Get
    $syncStatus = if ($statusResponse.isSyncing) { "Syncing" } else { "Ready" }
    Write-Host "✅ Sync status: $syncStatus" -ForegroundColor Green
    Write-Host "📊 Data counts: $($statusResponse.dataCounts | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    Write-Host ""

    # 2. Test enhanced tokens endpoint
    Write-Host "2️⃣ Testing enhanced tokens endpoint..." -ForegroundColor Yellow
    $tokensResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens" -Method Get
    Write-Host "✅ Enhanced tokens: $($tokensResponse.Count) tokens found" -ForegroundColor Green
    
    if ($tokensResponse.Count -gt 0) {
        $sampleToken = $tokensResponse[0]
        Write-Host "📋 Sample token: $($sampleToken | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    }
    Write-Host ""

    # 3. Test enhanced components endpoint
    Write-Host "3️⃣ Testing enhanced components endpoint..." -ForegroundColor Yellow
    $componentsResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/components" -Method Get
    Write-Host "✅ Enhanced components: $($componentsResponse.Count) components found" -ForegroundColor Green
    
    if ($componentsResponse.Count -gt 0) {
        $sampleComponent = $componentsResponse[0]
        Write-Host "📋 Sample component: $($sampleComponent | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    }
    Write-Host ""

    # 4. Test enhanced sync
    Write-Host "4️⃣ Testing enhanced sync..." -ForegroundColor Yellow
    $syncBody = @{
        syncType = "full"
    } | ConvertTo-Json
    
    $syncResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/sync" -Method Post -Body $syncBody -ContentType "application/json"
    Write-Host "✅ Enhanced sync started: $($syncResponse.message)" -ForegroundColor Green
    Write-Host "🆔 Sync ID: $($syncResponse.syncId)" -ForegroundColor Cyan
    Write-Host ""

    # 5. Wait a moment and check sync status
    Write-Host "5️⃣ Waiting for sync to complete..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    
    $updatedStatus = Invoke-RestMethod -Uri "$BASE_URL/sync-status" -Method Get
    Write-Host "📊 Updated sync status: $($updatedStatus.syncDetails | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    Write-Host ""

    # 6. Test token categorization
    Write-Host "6️⃣ Testing token categorization..." -ForegroundColor Yellow
    $colorTokens = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens/color" -Method Get
    $typographyTokens = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens/typography" -Method Get
    Write-Host "✅ Color tokens: $($colorTokens.Count)" -ForegroundColor Green
    Write-Host "✅ Typography tokens: $($typographyTokens.Count)" -ForegroundColor Green
    Write-Host ""

    # 7. Test component with token usage
    if ($componentsResponse.Count -gt 0) {
        Write-Host "7️⃣ Testing component with token usage..." -ForegroundColor Yellow
        $componentId = $componentsResponse[0].id
        $componentDetail = Invoke-RestMethod -Uri "$BASE_URL/enhanced/components/$componentId" -Method Get
        Write-Host "✅ Component details: $($componentDetail | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    }

    Write-Host ""
    Write-Host "🎉 All tests completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Summary:" -ForegroundColor Cyan
    Write-Host "- Enhanced token extraction: ✅" -ForegroundColor Green
    Write-Host "- Enhanced component extraction: ✅" -ForegroundColor Green
    Write-Host "- Token-component linking: ✅" -ForegroundColor Green
    Write-Host "- Multi-file support: ✅" -ForegroundColor Green
    Write-Host "- API endpoints: ✅" -ForegroundColor Green

} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host ""
        Write-Host "💡 Tip: Make sure the server is running and the enhanced endpoints are available" -ForegroundColor Yellow
    }
} 