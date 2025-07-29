# Test Enhanced Figma Endpoints
# Tests the new enhanced token and component extraction features

$BASE_URL = "http://localhost:3200/api/mcp/figma"

Write-Host "🧪 Testing Enhanced Figma Endpoints..." -ForegroundColor Green
Write-Host ""

try {
    # 1. Test enhanced tokens endpoint
    Write-Host "1️⃣ Testing enhanced tokens endpoint..." -ForegroundColor Yellow
    $tokensResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens" -Method Get
    $tokenCount = if ($tokensResponse) { $tokensResponse.Count } else { 0 }
    Write-Host "✅ Enhanced tokens: $tokenCount tokens found" -ForegroundColor Green
    
    if ($tokenCount -gt 0) {
        $firstToken = $tokensResponse[0]
        Write-Host "   📋 Sample token: $($firstToken.name) ($($firstToken.type))" -ForegroundColor Cyan
        Write-Host "   📂 Category: $($firstToken.category)" -ForegroundColor Cyan
        Write-Host "   📁 File ID: $($firstToken.fileId)" -ForegroundColor Cyan
    }
    Write-Host ""

    # 2. Test enhanced components endpoint
    Write-Host "2️⃣ Testing enhanced components endpoint..." -ForegroundColor Yellow
    $componentsResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/components" -Method Get
    $componentCount = if ($componentsResponse) { $componentsResponse.Count } else { 0 }
    Write-Host "✅ Enhanced components: $componentCount components found" -ForegroundColor Green
    
    if ($componentCount -gt 0) {
        $firstComponent = $componentsResponse[0]
        Write-Host "   📋 Sample component: $($firstComponent.name) ($($firstComponent.type))" -ForegroundColor Cyan
        Write-Host "   📁 File ID: $($firstComponent.fileId)" -ForegroundColor Cyan
        if ($firstComponent.usedTokens) {
            $tokenTypes = $firstComponent.usedTokens | Get-Member -MemberType NoteProperty | Select-Object -ExpandProperty Name
            Write-Host "   🎨 Token types: $($tokenTypes -join ', ')" -ForegroundColor Cyan
        }
    }
    Write-Host ""

    # 3. Test enhanced sync endpoint
    Write-Host "3️⃣ Testing enhanced sync endpoint..." -ForegroundColor Yellow
    $syncBody = @{
        syncType = "full"
    } | ConvertTo-Json
    
    $syncResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/sync" -Method Post -Body $syncBody -ContentType "application/json"
    Write-Host "✅ Enhanced sync response: $($syncResponse.message)" -ForegroundColor Green
    Write-Host "   🆔 Sync ID: $($syncResponse.syncId)" -ForegroundColor Cyan
    Write-Host ""

    # 4. Test token filtering by type
    Write-Host "4️⃣ Testing token filtering by type..." -ForegroundColor Yellow
    $colorTokensResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens/color" -Method Get
    $colorTokenCount = if ($colorTokensResponse) { $colorTokensResponse.Count } else { 0 }
    Write-Host "✅ Color tokens: $colorTokenCount found" -ForegroundColor Green
    Write-Host ""

    # 5. Test token filtering by category
    Write-Host "5️⃣ Testing token filtering by category..." -ForegroundColor Yellow
    $primaryTokensResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens/category/colors/primary" -Method Get
    $primaryTokenCount = if ($primaryTokensResponse) { $primaryTokensResponse.Count } else { 0 }
    Write-Host "✅ Primary color tokens: $primaryTokenCount found" -ForegroundColor Green
    Write-Host ""

    # 6. Test component details endpoint
    if ($componentCount -gt 0) {
        Write-Host "6️⃣ Testing component details endpoint..." -ForegroundColor Yellow
        $firstComponentId = $componentsResponse[0].id
        $componentDetailsResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/components/$firstComponentId" -Method Get
        Write-Host "✅ Component details retrieved for: $($componentDetailsResponse.name)" -ForegroundColor Green
        Write-Host ""

        # 7. Test token usage endpoint
        if ($tokenCount -gt 0) {
            Write-Host "7️⃣ Testing token usage endpoint..." -ForegroundColor Yellow
            $firstTokenId = $tokensResponse[0].id
            $tokenUsageResponse = Invoke-RestMethod -Uri "$BASE_URL/enhanced/tokens/$firstTokenId/components" -Method Get
            $usageCount = if ($tokenUsageResponse) { $tokenUsageResponse.Count } else { 0 }
            Write-Host "✅ Components using token: $usageCount found" -ForegroundColor Green
            Write-Host ""
        }
    }

    Write-Host "🎉 All enhanced endpoints tested successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Yellow
    Write-Host "   • Enhanced tokens: $tokenCount" -ForegroundColor White
    Write-Host "   • Enhanced components: $componentCount" -ForegroundColor White
    Write-Host "   • Color tokens: $colorTokenCount" -ForegroundColor White
    Write-Host "   • Primary color tokens: $primaryTokenCount" -ForegroundColor White

} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.Exception.Response)" -ForegroundColor Red
} 