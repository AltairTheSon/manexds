const fs = require('fs');
const path = require('path');

console.log('📁 Populating enhanced files data...\n');

// Read the config to get the files
const config = require('./server/config.js');

// Create the enhanced files data
const enhancedFiles = config.figma.files.map((file, index) => ({
  id: file.id,
  name: file.name,
  type: file.type,
  description: file.description,
  priority: file.priority || index + 1,
  lastModified: new Date().toISOString(),
  version: '1.0.0'
}));

console.log('📋 Files to populate:');
enhancedFiles.forEach((file, index) => {
  console.log(`  ${index + 1}. ${file.name} (${file.type}) - ID: ${file.id}`);
});

// Create the enhanced cache data structure
const enhancedData = {
  tokens: [],
  components: [],
  files: enhancedFiles
};

// Save to the enhanced cache file
const storageDir = path.join(__dirname, 'server', 'storage');
const enhancedCacheFile = path.join(storageDir, 'enhanced-figma-cache.json');

// Ensure storage directory exists
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// Write the enhanced data
fs.writeFileSync(enhancedCacheFile, JSON.stringify(enhancedData, null, 2));

console.log('\n✅ Enhanced files data populated successfully!');
console.log(`📁 Saved to: ${enhancedCacheFile}`);
console.log(`📊 Files count: ${enhancedFiles.length}`);

console.log('\n🎯 Next steps:');
console.log('1. Restart the server to load the new data');
console.log('2. Refresh the Angular app');
console.log('3. The files should now appear in the dropdown');

// Also create a simple test to verify the endpoint
console.log('\n🧪 Testing the files endpoint...');

const http = require('http');
const options = {
  hostname: 'localhost',
  port: 3200,
  path: '/api/mcp/figma/files',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const files = JSON.parse(data);
      console.log('✅ Files endpoint working!');
      console.log(`📊 Retrieved ${files.length} files:`);
      files.forEach(file => {
        console.log(`  - ${file.name} (${file.type})`);
      });
    } catch (error) {
      console.log('❌ Error parsing response:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Server not running or endpoint not available:', error.message);
});

req.end(); 