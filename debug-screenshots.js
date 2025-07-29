const fs = require('fs');

try {
  console.log('🔍 Debugging Screenshots Container...\n');
  
  // Read the cache file
  const cache = JSON.parse(fs.readFileSync('server/storage/figma-cache.json', 'utf8'));
  
  // Find the Screenshots page
  const screenshotsPage = cache.pages.find(p => 
    p.name.toLowerCase().includes('screenshots')
  );
  
  if (!screenshotsPage) {
    console.log('❌ No Screenshots page found');
    return;
  }
  
  console.log(`📄 Found: "${screenshotsPage.name}"`);
  console.log(`📏 Size: ${screenshotsPage.absoluteBoundingBox?.width}x${screenshotsPage.absoluteBoundingBox?.height}`);
  console.log(`👥 Children: ${screenshotsPage.children?.length || 0}\n`);
  
  // Show all direct children
  if (screenshotsPage.children && screenshotsPage.children.length > 0) {
    console.log('🔍 Direct children in Screenshots:');
    screenshotsPage.children.forEach((child, i) => {
      console.log(`  ${i+1}. "${child.name}" (${child.type})`);
      console.log(`     Size: ${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}`);
      console.log(`     Children: ${child.children?.length || 0}`);
      
      // Check if this child has its own children (nested frames)
      if (child.children && child.children.length > 0) {
        console.log(`     Nested children:`);
        child.children.forEach((nestedChild, j) => {
          console.log(`       ${j+1}. "${nestedChild.name}" (${nestedChild.type}) - ${nestedChild.absoluteBoundingBox?.width}x${nestedChild.absoluteBoundingBox?.height}`);
        });
      }
      console.log('');
    });
  }
  
  // Test the isIndividualPage logic
  console.log('🧪 Testing isIndividualPage logic:');
  
  function isIndividualPage(node) {
    if (node.type === 'FRAME') {
      const containerKeywords = ['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'];
      const isContainer = containerKeywords.some(keyword => node.name.toLowerCase().includes(keyword));
      const hasReasonableSize = node.absoluteBoundingBox && 
                               node.absoluteBoundingBox.width >= 200 && 
                               node.absoluteBoundingBox.height >= 250;
      const hasContent = node.children && Array.isArray(node.children) && node.children.length >= 1;
      const isNotTooSmall = node.absoluteBoundingBox && 
                           node.absoluteBoundingBox.width >= 100 && 
                           node.absoluteBoundingBox.height >= 100;
      
      return !isContainer && hasReasonableSize && isNotTooSmall && hasContent;
    }
    return false;
  }
  
  // Test each child
  screenshotsPage.children?.forEach((child, i) => {
    const isIndividual = isIndividualPage(child);
    console.log(`  ${i+1}. "${child.name}": ${isIndividual ? '✅ Individual' : '❌ Not individual'}`);
    
    if (!isIndividual) {
      console.log(`     Reason: container=${child.name.toLowerCase().includes('container')}, size=${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}, content=${child.children?.length || 0}`);
    }
  });
  
} catch (error) {
  console.error('❌ Error:', error.message);
} 