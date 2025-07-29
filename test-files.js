const config = require('./config');
const https = require('https');

console.log('📁 Configured files:');
config.figma.files.forEach((file, index) => {
  console.log(`${index + 1}. ${file.name} (${file.type}) - ID: ${file.id}`);
});

console.log('\n🔍 Testing file accessibility...');

// Test each file
config.figma.files.forEach(async (file, index) => {
  console.log(`\nTesting file ${index + 1}: ${file.name}`);
  
  if (!config.figma.accessToken) {
    console.log('❌ No access token configured');
    return;
  }
  
  const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${file.id}`,
    method: 'GET',
    headers: {
      'X-Figma-Token': config.figma.accessToken
    }
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        const fileData = JSON.parse(data);
        console.log(`✅ File accessible: ${fileData.name}`);
        console.log(`   Version: ${fileData.version}`);
        console.log(`   Last modified: ${fileData.lastModified}`);
      } else {
        console.log(`❌ File not accessible: ${res.statusCode} - ${data}`);
      }
    });
  });
  
  req.on('error', (error) => {
    console.log(`❌ Error accessing file: ${error.message}`);
  });
  
  req.end();
}); 