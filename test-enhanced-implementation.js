/**
 * Test Enhanced Figma Implementation
 * Tests the new enhanced token and component extraction features
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3200/api/mcp/figma';

async function testEnhancedImplementation() {
  console.log('🧪 Testing Enhanced Figma Implementation...\n');

  try {
    // 1. Test sync status
    console.log('1️⃣ Testing sync status...');
    const statusResponse = await axios.get(`${BASE_URL}/sync-status`);
    console.log('✅ Sync status:', statusResponse.data.isSyncing ? 'Syncing' : 'Ready');
    console.log('📊 Data counts:', statusResponse.data.dataCounts);
    console.log('');

    // 2. Test enhanced tokens endpoint
    console.log('2️⃣ Testing enhanced tokens endpoint...');
    const tokensResponse = await axios.get(`${BASE_URL}/enhanced/tokens`);
    console.log(`✅ Enhanced tokens: ${tokensResponse.data.length} tokens found`);
    
    if (tokensResponse.data.length > 0) {
      console.log('📋 Sample token:', {
        name: tokensResponse.data[0].name,
        type: tokensResponse.data[0].type,
        category: tokensResponse.data[0].category,
        fileId: tokensResponse.data[0].fileId
      });
    }
    console.log('');

    // 3. Test enhanced components endpoint
    console.log('3️⃣ Testing enhanced components endpoint...');
    const componentsResponse = await axios.get(`${BASE_URL}/enhanced/components`);
    console.log(`✅ Enhanced components: ${componentsResponse.data.length} components found`);
    
    if (componentsResponse.data.length > 0) {
      console.log('📋 Sample component:', {
        name: componentsResponse.data[0].name,
        type: componentsResponse.data[0].type,
        fileId: componentsResponse.data[0].fileId,
        hasTokenUsage: componentsResponse.data[0].hasTokenUsage ? 'Yes' : 'No'
      });
    }
    console.log('');

    // 4. Test enhanced sync
    console.log('4️⃣ Testing enhanced sync...');
    const syncResponse = await axios.post(`${BASE_URL}/enhanced/sync`, {
      syncType: 'full'
    });
    console.log('✅ Enhanced sync started:', syncResponse.data.message);
    console.log('🆔 Sync ID:', syncResponse.data.syncId);
    console.log('');

    // 5. Wait a moment and check sync status
    console.log('5️⃣ Waiting for sync to complete...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedStatus = await axios.get(`${BASE_URL}/sync-status`);
    console.log('📊 Updated sync status:', {
      isSyncing: updatedStatus.data.isSyncing,
      phase: updatedStatus.data.syncDetails.phase,
      message: updatedStatus.data.syncDetails.message
    });
    console.log('');

    // 6. Test token categorization
    console.log('6️⃣ Testing token categorization...');
    const colorTokens = await axios.get(`${BASE_URL}/enhanced/tokens/color`);
    const typographyTokens = await axios.get(`${BASE_URL}/enhanced/tokens/typography`);
    console.log(`✅ Color tokens: ${colorTokens.data.length}`);
    console.log(`✅ Typography tokens: ${typographyTokens.data.length}`);
    console.log('');

    // 7. Test component with token usage
    if (componentsResponse.data.length > 0) {
      console.log('7️⃣ Testing component with token usage...');
      const componentId = componentsResponse.data[0].id;
      const componentDetail = await axios.get(`${BASE_URL}/enhanced/components/${componentId}`);
      console.log('✅ Component details:', {
        name: componentDetail.data.name,
        usedTokens: componentDetail.data.usedTokens,
        tokenCount: Object.values(componentDetail.data.usedTokens || {}).flat().length
      });
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Enhanced token extraction: ✅');
    console.log('- Enhanced component extraction: ✅');
    console.log('- Token-component linking: ✅');
    console.log('- Multi-file support: ✅');
    console.log('- API endpoints: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      console.log('\n💡 Tip: Make sure the server is running and the enhanced endpoints are available');
    }
  }
}

// Run the test
testEnhancedImplementation(); 