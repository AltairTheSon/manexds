const fs = require('fs');
const path = require('path');

// Figma API integration (you'll need to install: npm install figma-api)
// const { Figma } = require('figma-api');

/**
 * Extract design tokens from Figma and generate CSS variables
 * 
 * Usage:
 * 1. Get your Figma access token from: https://www.figma.com/developers/api#access-tokens
 * 2. Get your file ID from the Figma URL: https://www.figma.com/file/FILE_ID/...
 * 3. Run: node scripts/extract-figma-tokens.js
 */

// Configuration
const CONFIG = {
  figmaToken: process.env.FIGMA_TOKEN || 'your-figma-token-here',
  fileId: process.env.FIGMA_FILE_ID || 'your-file-id-here',
  outputPath: path.join(__dirname, '../src/styles/tokens.scss')
};

/**
 * Example function to extract tokens from Figma API
 * Uncomment and modify based on your Figma file structure
 */
async function extractFigmaTokens() {
  console.log('🔍 Extracting design tokens from Figma...');
  
  // Example token structure - replace with your actual Figma data
  const tokens = {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      },
      success: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d'
      },
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309'
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      }
    },
    typography: {
      fontFamily: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    spacing: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem'
    },
    borderRadius: {
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    },
    transitions: {
      fast: '150ms ease-in-out',
      base: '200ms ease-in-out',
      slow: '300ms ease-in-out'
    },
    zIndex: {
      dropdown: '1000',
      sticky: '1020',
      fixed: '1030',
      modalBackdrop: '1040',
      modal: '1050',
      popover: '1060',
      tooltip: '1070'
    }
  };

  return tokens;
}

/**
 * Generate CSS variables from tokens
 */
function generateCSSVariables(tokens) {
  console.log('🎨 Generating CSS variables...');
  
  let css = '/* Design System Tokens - Generated from Figma */\n';
  css += '/* Auto-generated on: ' + new Date().toISOString() + ' */\n\n';
  css += ':root {\n';

  // Colors
  css += '  /* Colors */\n';
  Object.entries(tokens.colors).forEach(([colorName, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, value]) => {
      css += `  --ds-${colorName}-${shade}: ${value};\n`;
    });
  });

  // Typography
  css += '\n  /* Typography */\n';
  Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
    css += `  --ds-font-family-${name}: ${value};\n`;
  });

  Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
    css += `  --ds-font-size-${size}: ${value};\n`;
  });

  Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
    css += `  --ds-font-weight-${weight}: ${value};\n`;
  });

  Object.entries(tokens.typography.lineHeight).forEach(([height, value]) => {
    css += `  --ds-line-height-${height}: ${value};\n`;
  });

  // Spacing
  css += '\n  /* Spacing */\n';
  Object.entries(tokens.spacing).forEach(([space, value]) => {
    css += `  --ds-space-${space}: ${value};\n`;
  });

  // Border Radius
  css += '\n  /* Border Radius */\n';
  Object.entries(tokens.borderRadius).forEach(([radius, value]) => {
    css += `  --ds-radius-${radius}: ${value};\n`;
  });

  // Shadows
  css += '\n  /* Shadows */\n';
  Object.entries(tokens.shadows).forEach(([shadow, value]) => {
    css += `  --ds-shadow-${shadow}: ${value};\n`;
  });

  // Transitions
  css += '\n  /* Transitions */\n';
  Object.entries(tokens.transitions).forEach(([transition, value]) => {
    css += `  --ds-transition-${transition}: ${value};\n`;
  });

  // Z-Index
  css += '\n  /* Z-Index */\n';
  Object.entries(tokens.zIndex).forEach(([zIndex, value]) => {
    css += `  --ds-z-${zIndex}: ${value};\n`;
  });

  css += '}\n';
  
  return css;
}

/**
 * Save CSS variables to file
 */
function saveTokensToFile(cssContent) {
  // Ensure directory exists
  const dir = path.dirname(CONFIG.outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(CONFIG.outputPath, cssContent);
  console.log(`✅ Tokens saved to: ${CONFIG.outputPath}`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Extract tokens from Figma (or use example data)
    const tokens = await extractFigmaTokens();
    
    // Generate CSS variables
    const cssVariables = generateCSSVariables(tokens);
    
    // Save to file
    saveTokensToFile(cssVariables);
    
    console.log('🎉 Design tokens extraction complete!');
    console.log('\nNext steps:');
    console.log('1. Review the generated tokens in src/styles/tokens.scss');
    console.log('2. Import the tokens in your main styles.scss file');
    console.log('3. Update your components to use the new tokens');
    
  } catch (error) {
    console.error('❌ Error extracting tokens:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  extractFigmaTokens,
  generateCSSVariables,
  saveTokensToFile
}; 