/**
 * Simple test for enhanced sync
 */

const http = require('http');

console.log('🧪 Testing Enhanced Sync to get real file names...\n');

// Test server status first
function testServerStatus() {
  return new Promise((resolve, reject) => {
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
          const status = JSON.parse(data);
          console.log('✅ Server is running');
          console.log('📊 Current status:', status.status);
          resolve(status);
        } catch (error) {
          console.log('❌ Error parsing server status:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Server not running:', error.message);
      reject(error);
    });

    req.end();
  });
}

// Trigger enhanced sync
function triggerEnhancedSync() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      syncType: 'full'
    });

    const options = {
      hostname: 'localhost',
      port: 3200,
      path: '/api/mcp/figma/enhanced-sync',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
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
          console.log('✅ Enhanced sync triggered');
          console.log('📊 Sync result:', result);
          resolve(result);
        } catch (error) {
          console.log('❌ Error parsing sync result:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Error triggering sync:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Check files after sync
function checkFiles() {
  return new Promise((resolve, reject) => {
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
          console.log('\n📁 Files after enhanced sync:');
          console.log('📊 Total files:', files.length);
          files.forEach((file, index) => {
            console.log(`  ${index + 1}. ${file.name} (${file.type})`);
            console.log(`     ID: ${file.id}`);
            console.log(`     Version: ${file.version}`);
            console.log(`     Last Modified: ${file.lastModified}`);
            if (file.lastModifiedBy) {
              console.log(`     Modified by: ${file.lastModifiedBy}`);
            }
            console.log('');
          });
          resolve(files);
        } catch (error) {
          console.log('❌ Error parsing files:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Error checking files:', error.message);
      reject(error);
    });

    req.end();
  });
}

// Main test function
async function runTest() {
  try {
    console.log('🔍 Step 1: Checking server status...');
    await testServerStatus();
    
    console.log('\n🔄 Step 2: Triggering enhanced sync...');
    await triggerEnhancedSync();
    
    console.log('\n⏳ Waiting 5 seconds for sync to complete...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('\n📋 Step 3: Checking files...');
    await checkFiles();
    
    console.log('\n🎉 Test completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Refresh your Angular app at http://localhost:4200');
    console.log('2. Go to Dashboard to see real file names');
    console.log('3. Verify no duplicate files are shown');
    
  } catch (error) {
    console.log('\n❌ Test failed:', error.message);
  }
}

// Run the test
runTest(); 