const fs = require('fs');
const path = require('path');

// Load the cached data
const cacheFile = path.join(__dirname, 'server', 'storage', 'figma-cache.json');
const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

// Find the mini-success component
const miniSuccessComponent = cacheData.components.find(comp => 
  comp.name === 'other/alerts/mini-success'
);

if (!miniSuccessComponent) {
  console.log('mini-success component not found');
  process.exit(1);
}

console.log('Found mini-success component:');
console.log('ID:', miniSuccessComponent.id);
console.log('Name:', miniSuccessComponent.name);
console.log('Type:', miniSuccessComponent.type);

// Simulate the HTML generation logic
function generateComponentHtmlFromChildren(children, tokens) {
  let html = '';
  
  children.forEach((child, index) => {
    if (!child.absoluteBoundingBox) return;
    
    const x = child.absoluteBoundingBox.x || 0;
    const y = child.absoluteBoundingBox.y || 0;
    const width = child.absoluteBoundingBox.width || 100;
    const height = child.absoluteBoundingBox.height || 50;
    
    let elementClass = 'component-element';
    let content = child.name || 'Element ' + (index + 1);
    
    // Determine element type and styling
    if (child.type === 'TEXT') {
      elementClass += ' text';
      content = child.characters || child.name || 'Text';
    } else if (child.type === 'ELLIPSE' || child.type === 'VECTOR') {
      elementClass += ' icon';
      content = '🔘';
    }
    
    html += '<div class="' + elementClass + '" ' +
            'style="left: ' + x + 'px; top: ' + y + 'px; width: ' + width + 'px; height: ' + height + 'px;" ' +
            'data-name="' + (child.name || 'Unknown') + '" ' +
            'data-type="' + (child.type || 'Unknown') + '" ' +
            'title="' + (child.name || 'Element') + '">' +
            content +
            '</div>';
  });
  
  return html;
}

function generateComponentPlaceholderHtml(component) {
  return '<div class="placeholder-content">' +
         '<div class="placeholder-icon">🧩</div>' +
         '<div class="placeholder-title">' + component.name + '</div>' +
         '<div class="placeholder-subtitle">' +
         'Component preview<br>' +
         'No detailed content available' +
         '</div>' +
         '</div>';
}

// Generate the HTML preview
const width = miniSuccessComponent.absoluteBoundingBox ? Math.round(miniSuccessComponent.absoluteBoundingBox.width) : 200;
const height = miniSuccessComponent.absoluteBoundingBox ? Math.round(miniSuccessComponent.absoluteBoundingBox.height) : 100;

// Get design tokens for styling
const tokens = cacheData.tokens || [];

// Generate HTML based on component type and properties
let htmlContent = '';

if (miniSuccessComponent.children && miniSuccessComponent.children.length > 0) {
  console.log('\nGenerating HTML from children...');
  htmlContent = generateComponentHtmlFromChildren(miniSuccessComponent.children, tokens);
} else {
  console.log('\nGenerating placeholder HTML...');
  htmlContent = generateComponentPlaceholderHtml(miniSuccessComponent);
}

const html = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>' + miniSuccessComponent.name + ' - Component Preview</title>' +
    '<style>' +
        '* {' +
            'margin: 0;' +
            'padding: 0;' +
            'box-sizing: border-box;' +
        '}' +
        'body {' +
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
            'background: #f8f9fa;' +
            'display: flex;' +
            'justify-content: center;' +
            'align-items: center;' +
            'min-height: 100vh;' +
            'padding: 20px;' +
        '}' +
        '.component-container {' +
            'background: white;' +
            'border-radius: 8px;' +
            'box-shadow: 0 4px 20px rgba(0,0,0,0.1);' +
            'overflow: hidden;' +
            'max-width: 100%;' +
            'max-height: 100%;' +
        '}' +
        '.component-header {' +
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' +
            'color: white;' +
            'padding: 15px 20px;' +
            'text-align: center;' +
        '}' +
        '.component-content {' +
            'width: ' + width + 'px;' +
            'height: ' + height + 'px;' +
            'position: relative;' +
            'background: white;' +
            'overflow: hidden;' +
            'padding: 20px;' +
        '}' +
        '.component-element {' +
            'position: absolute;' +
            'border: 1px solid #e9ecef;' +
            'background: #f8f9fa;' +
            'display: flex;' +
            'align-items: center;' +
            'justify-content: center;' +
            'font-size: 12px;' +
            'color: #666;' +
            'cursor: pointer;' +
            'transition: all 0.3s ease;' +
        '}' +
        '.component-element:hover {' +
            'background: #667eea;' +
            'color: white;' +
            'transform: scale(1.02);' +
        '}' +
        '.component-element.text {' +
            'background: transparent;' +
            'border: none;' +
            'color: #333;' +
            'font-weight: 500;' +
        '}' +
        '.component-element.icon {' +
            'background: #28a745;' +
            'color: white;' +
            'border-radius: 50%;' +
            'border: none;' +
        '}' +
        '.placeholder-content {' +
            'display: flex;' +
            'flex-direction: column;' +
            'align-items: center;' +
            'justify-content: center;' +
            'height: 100%;' +
            'text-align: center;' +
            'color: #666;' +
        '}' +
        '.placeholder-icon {' +
            'font-size: 48px;' +
            'margin-bottom: 16px;' +
        '}' +
        '.placeholder-title {' +
            'font-size: 18px;' +
            'font-weight: 600;' +
            'margin-bottom: 8px;' +
            'color: #333;' +
        '}' +
        '.placeholder-subtitle {' +
            'font-size: 14px;' +
            'line-height: 1.4;' +
        '}' +
    '</style>' +
'</head>' +
'<body>' +
    '<div class="component-container">' +
        '<div class="component-header">' +
            '<h2>' + miniSuccessComponent.name + '</h2>' +
            '<p>Component Preview</p>' +
        '</div>' +
        '<div class="component-content">' +
            htmlContent +
        '</div>' +
    '</div>' +
'</body>' +
'</html>';

// Save the generated HTML to a file
fs.writeFileSync('mini-success-preview.html', html);
console.log('\nGenerated HTML preview saved to: mini-success-preview.html');

// Also log the component structure
console.log('\nComponent structure:');
if (miniSuccessComponent.children) {
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
} else {
  console.log('No children found');
} 