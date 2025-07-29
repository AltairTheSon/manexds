const fs = require('fs');
const path = require('path');

// Load the cached data
const cacheFile = path.join(__dirname, 'server', 'storage', 'figma-cache.json');
const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

// Find the mini-success component
const miniSuccessComponent = cacheData.components.find(comp => 
  comp.name === 'other/alerts/mini-success'
);

if (miniSuccessComponent) {
  console.log('Found mini-success component:');
  console.log('ID:', miniSuccessComponent.id);
  console.log('Name:', miniSuccessComponent.name);
  console.log('Type:', miniSuccessComponent.type);
  console.log('Children count:', miniSuccessComponent.children ? miniSuccessComponent.children.length : 0);
  
  if (miniSuccessComponent.children) {
    console.log('\nChildren:');
    miniSuccessComponent.children.forEach((child, index) => {
      console.log(`${index + 1}. ${child.name} (${child.type})`);
      if (child.characters) {
        console.log(`   Text: "${child.characters}"`);
      }
      if (child.absoluteBoundingBox) {
        console.log(`   Position: x=${child.absoluteBoundingBox.x}, y=${child.absoluteBoundingBox.y}`);
        console.log(`   Size: ${child.absoluteBoundingBox.width}x${child.absoluteBoundingBox.height}`);
      }
    });
  }
  
  console.log('\nProperties:', miniSuccessComponent.properties || 'None');
  console.log('\nVariants:', miniSuccessComponent.variants || 'None');
  
} else {
  console.log('mini-success component not found in cache');
  console.log('Available components:');
  cacheData.components.slice(0, 10).forEach(comp => {
    console.log(`- ${comp.name} (${comp.id})`);
  });
} 