/**
 * Test Multi-File Configuration
 */

const config = require('./server/config.js');

console.log('🧪 Testing Multi-File Configuration...\n');

// Test configuration
console.log('📋 Figma Configuration:');
console.log('   Access Token:', config.figma.accessToken ? '✅ Set' : '❌ Not set');
console.log('   Files configured:', config.figma.files.length);

console.log('\n📁 Configured Files:');
config.figma.files.forEach((file, index) => {
  console.log(`   ${index + 1}. ${file.name}`);
  console.log(`      ID: ${file.id}`);
  console.log(`      Type: ${file.type}`);
  console.log(`      Priority: ${file.priority}`);
  console.log(`      Description: ${file.description}`);
  console.log('');
});

console.log('🎯 Enhanced Settings:');
console.log('   Token Extraction:', config.figma.tokenExtraction.enabled ? '✅ Enabled' : '❌ Disabled');
console.log('   Component Extraction:', config.figma.componentExtraction.enabled ? '✅ Enabled' : '❌ Disabled');
console.log('   Multi-File Support:', config.figma.files.length > 1 ? '✅ Enabled' : '❌ Single file only');

console.log('\n✅ Multi-file configuration test completed!');
console.log('\n🚀 Next steps:');
console.log('   1. Start the enhanced server: cd server && node mcp-figma-server.js');
console.log('   2. Test enhanced sync: POST /api/mcp/figma/enhanced/sync');
console.log('   3. View tokens by file: GET /api/mcp/figma/enhanced/tokens');
console.log('   4. View components by file: GET /api/mcp/figma/enhanced/components'); 