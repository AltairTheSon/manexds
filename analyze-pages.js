const fs = require('fs');
const path = require('path');

// Read the cached data
const cacheFile = path.join(__dirname, 'server', 'storage', 'figma-cache.json');

try {
  const data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  
  console.log('📄 Analyzing page structure...\n');
  
  if (data.pages && Array.isArray(data.pages)) {
    console.log(`Found ${data.pages.length} top-level pages:\n`);
    
    data.pages.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name} (${page.type})`);
      console.log(`   ID: ${page.id}`);
      console.log(`   Children: ${page.children ? page.children.length : 0}`);
      
      // Look for individual pages within this page
      if (page.children && Array.isArray(page.children)) {
        console.log('   Individual pages found:');
        page.children.forEach((child, childIndex) => {
          if (child.type === 'FRAME' && child.name && !child.name.toLowerCase().includes('container')) {
            console.log(`     - ${child.name} (${child.type}) - ID: ${child.id}`);
            if (child.absoluteBoundingBox) {
              console.log(`       Bounds: ${child.absoluteBoundingBox.width}x${child.absoluteBoundingBox.height}`);
            }
          }
        });
      }
      console.log('');
    });
  } else {
    console.log('No pages found in cache data');
  }
  
} catch (error) {
  console.error('Error reading cache file:', error.message);
} 