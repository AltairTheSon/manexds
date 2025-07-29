const fs = require('fs');
const path = require('path');

// Clear the HTML preview cache
const htmlPreviewCacheFile = path.join(__dirname, 'server', 'storage', 'html-preview-cache.json');

if (fs.existsSync(htmlPreviewCacheFile)) {
  fs.unlinkSync(htmlPreviewCacheFile);
  console.log('🗑️ HTML preview cache cleared');
} else {
  console.log('📝 No HTML preview cache file found');
}

console.log('✅ Cache cleared. New HTML previews will be generated with improved styling.'); 