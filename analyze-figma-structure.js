const fs = require('fs');

try {
  console.log('🔍 Analyzing Figma Data Structure...\n');
  
  // Read the cache file
  const cache = JSON.parse(fs.readFileSync('server/storage/figma-cache.json', 'utf8'));
  
  console.log(`📊 Cache contains:`);
  console.log(`  - Pages: ${cache.pages?.length || 0}`);
  console.log(`  - Components: ${cache.components?.length || 0}`);
  console.log(`  - Tokens: ${cache.tokens?.length || 0}\n`);
  
  // List all pages
  console.log('📄 All Pages:');
  cache.pages?.forEach((page, index) => {
    console.log(`  ${index + 1}. "${page.name}" (${page.type})`);
    console.log(`     Size: ${page.absoluteBoundingBox?.width}x${page.absoluteBoundingBox?.height}`);
    console.log(`     Children: ${page.children?.length || 0}`);
    
    // Check if this is the Screenshots page
    if (page.name.toLowerCase().includes('screenshots')) {
      console.log(`     🎯 THIS IS THE SCREENSHOTS CONTAINER!`);
    }
    console.log('');
  });
  
  // Find the Screenshots page specifically
  const screenshotsPage = cache.pages.find(p => 
    p.name.toLowerCase().includes('screenshots')
  );
  
  if (screenshotsPage) {
    console.log('🎯 FOUND SCREENSHOTS CONTAINER:');
    console.log(`   Name: "${screenshotsPage.name}"`);
    console.log(`   Type: ${screenshotsPage.type}`);
    console.log(`   Size: ${screenshotsPage.absoluteBoundingBox?.width}x${screenshotsPage.absoluteBoundingBox?.height}`);
    console.log(`   Direct Children: ${screenshotsPage.children?.length || 0}\n`);
    
    // Analyze the structure of Screenshots container
    if (screenshotsPage.children && screenshotsPage.children.length > 0) {
      console.log('🔍 Screenshots Container Structure:');
      screenshotsPage.children.forEach((child, index) => {
        console.log(`  ${index + 1}. "${child.name}" (${child.type})`);
        console.log(`     Size: ${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}`);
        console.log(`     Children: ${child.children?.length || 0}`);
        
        // If this child has children, show them too
        if (child.children && child.children.length > 0) {
          console.log(`     Nested children:`);
          child.children.forEach((nestedChild, nestedIndex) => {
            console.log(`       ${nestedIndex + 1}. "${nestedChild.name}" (${nestedChild.type})`);
            console.log(`          Size: ${nestedChild.absoluteBoundingBox?.width}x${nestedChild.absoluteBoundingBox?.height}`);
            console.log(`          Children: ${nestedChild.children?.length || 0}`);
          });
        }
        console.log('');
      });
      
      // Count potential individual pages
      let potentialPages = 0;
      let totalFrames = 0;
      
      function countFramesRecursive(node) {
        if (node.type === 'FRAME') {
          totalFrames++;
          // Check if this could be an individual page
          if (node.absoluteBoundingBox) {
            const isLargeEnough = node.absoluteBoundingBox.width >= 200 && node.absoluteBoundingBox.height >= 300;
            const hasContent = node.children && Array.isArray(node.children) && node.children.length >= 1;
            const isNotContainer = !['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'].some(keyword => 
              node.name.toLowerCase().includes(keyword)
            );
            
            if (isLargeEnough && hasContent && isNotContainer) {
              potentialPages++;
              console.log(`🎯 Potential individual page: "${node.name}" (${node.absoluteBoundingBox.width}x${node.absoluteBoundingBox.height})`);
            }
          }
        }
        
        // Recursively check children
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(child => countFramesRecursive(child));
        }
      }
      
      console.log('🔍 Counting potential individual pages in Screenshots:');
      countFramesRecursive(screenshotsPage);
      
      console.log(`\n📈 Summary:`);
      console.log(`  Total FRAME elements: ${totalFrames}`);
      console.log(`  Potential individual pages: ${potentialPages}`);
      
    } else {
      console.log('❌ Screenshots container has no children!');
    }
    
  } else {
    console.log('❌ No Screenshots page found!');
    console.log('Available pages:');
    cache.pages?.forEach(page => {
      console.log(`  - "${page.name}"`);
    });
  }
  
} catch (error) {
  console.error('❌ Error analyzing data:', error.message);
} 