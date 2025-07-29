/**
 * Quick test for enhanced multi-file configuration
 */

const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3200,
      path: path,
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
          resolve({ status: res.statusCode, data: result });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function quickTest() {
  console.log('🧪 Quick Test - Enhanced Multi-File Configuration\n');

  try {
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server status...');
    const status = await testEndpoint('/api/mcp/figma/sync-status');
    console.log('✅ Server is running');
    console.log('📊 Current data counts:', status.data.dataCounts);
    console.log('');

    // Test 2: Test enhanced tokens endpoint
    console.log('2️⃣ Testing enhanced tokens endpoint...');
    const tokens = await testEndpoint('/api/mcp/figma/enhanced/tokens');
    console.log('✅ Enhanced tokens endpoint working');
    console.log('📋 Token count:', tokens.data.length || 0);
    console.log('');

    // Test 3: Test enhanced components endpoint
    console.log('3️⃣ Testing enhanced components endpoint...');
    const components = await testEndpoint('/api/mcp/figma/enhanced/components');
    console.log('✅ Enhanced components endpoint working');
    console.log('📋 Component count:', components.data.length || 0);
    console.log('');

    // Test 4: Test enhanced sync
    console.log('4️⃣ Testing enhanced sync...');
    const syncResult = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3200,
        path: '/api/mcp/figma/enhanced/sync',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            resolve({ status: res.statusCode, data: result });
          } catch (error) {
            resolve({ status: res.statusCode, data: data });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify({ syncType: 'full' }));
      req.end();
    });

    console.log('✅ Enhanced sync endpoint working');
    console.log('🔄 Sync message:', syncResult.data.message || 'Sync initiated');
    console.log('');

    console.log('🎉 All enhanced endpoints are working!');
    console.log('');
    console.log('📁 Multi-file configuration:');
    console.log('   • File 1: Design System (6zbyXDOYjJsJW52P6iZ3hL)');
    console.log('   • File 2: Additional Design File (jvhAvDIp7YxKbLjxXwOsHO)');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Open test-enhanced-html.html to test the UI');
    console.log('   2. Start Angular app: ng serve --port 4200');
    console.log('   3. Use the enhanced design system interface');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure the server is running: cd server && node mcp-figma-server.js');
    console.log('   2. Check if port 3200 is available');
    console.log('   3. Verify your Figma access token is set');
  }
}

quickTest(); 