const fs = require('fs');

try {
  // Read the cache file
  const cache = JSON.parse(fs.readFileSync('server/storage/figma-cache.json', 'utf8'));
  
  console.log('📊 Analyzing Screenshots Container...\n');
  
  // Find the Screenshots page
  const screenshotsPage = cache.pages.find(p => 
    p.name.toLowerCase().includes('screenshots')
  );
  
  if (!screenshotsPage) {
    console.log('❌ No Screenshots page found in cache');
    return;
  }
  
  console.log(`📄 Found Screenshots page: "${screenshotsPage.name}"`);
  console.log(`📏 Page dimensions: ${screenshotsPage.absoluteBoundingBox?.width}x${screenshotsPage.absoluteBoundingBox?.height}`);
  console.log(`👥 Total children: ${screenshotsPage.children?.length || 0}`);
  console.log(`📋 Sub-pages extracted: ${screenshotsPage.flowData?.subPages?.length || 0}\n`);
  
  // Show all children
  if (screenshotsPage.children && screenshotsPage.children.length > 0) {
    console.log('🔍 All children in Screenshots:');
    screenshotsPage.children.forEach((child, i) => {
      console.log(`  ${i+1}. "${child.name}" (${child.type})`);
      console.log(`     Size: ${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}`);
      console.log(`     Children: ${child.children?.length || 0}`);
      console.log('');
    });
  }
  
  // Show extracted sub-pages
  if (screenshotsPage.flowData?.subPages && screenshotsPage.flowData.subPages.length > 0) {
    console.log('✅ Extracted individual pages:');
    screenshotsPage.flowData.subPages.forEach((subPage, i) => {
      console.log(`  ${i+1}. "${subPage.name}" (${subPage.type})`);
      console.log(`     Size: ${subPage.bounds?.width}x${subPage.bounds?.height}`);
      console.log(`     Children: ${subPage.children?.length || 0}`);
      console.log(`     Clickable elements: ${subPage.flowData?.clickableElements?.length || 0}`);
      console.log('');
    });
  }
  
  console.log(`📈 Summary: ${screenshotsPage.flowData?.subPages?.length || 0} individual pages extracted from Screenshots`);
  
} catch (error) {
  console.error('❌ Error analyzing data:', error.message);
} 