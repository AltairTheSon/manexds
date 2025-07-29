const http = require('http');

console.log('🧪 Testing server on port 3200...\n');

const options = {
  hostname: 'localhost',
  port: 3200,
  path: '/api/mcp/figma/sync-status',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('✅ Server is running on port 3200');
      console.log('📊 Status:', result.isSyncing ? 'Syncing' : 'Ready');
      console.log('📋 Data counts:', result.dataCounts);
    } catch (error) {
      console.log('❌ Failed to parse response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Server not running on port 3200:', error.message);
});

req.end(); 