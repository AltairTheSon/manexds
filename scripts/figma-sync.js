const FigmaConnector = require('./figma-connector');
const fs = require('fs');
const path = require('path');

/**
 * Figma Sync Script
 * Syncs Figma designs with Angular design system
 */

class FigmaSync {
  constructor(token, fileId) {
    this.connector = new FigmaConnector(token, fileId);
    this.outputDir = path.join(__dirname, '../src/design-system');
  }

  /**
   * Main sync function
   */
  async sync() {
    console.log('🚀 Starting Figma sync...\n');

    try {
      // 1. Extract design tokens
      console.log('📊 Step 1: Extracting design tokens...');
      const tokens = await this.connector.extractDesignTokens();
      await this.saveDesignTokens(tokens);

      // 2. Extract components
      console.log('🧩 Step 2: Extracting components...');
      const components = await this.connector.extractComponents();
      await this.saveComponents(components);

      // 3. Extract pages
      console.log('📄 Step 3: Extracting pages...');
      const pages = await this.connector.extractPages();
      await this.savePages(pages);

      // 4. Generate Angular components
      console.log('⚡ Step 4: Generating Angular components...');
      const angularComponents = await this.connector.generateAngularComponents();
      await this.generateAngularFiles(angularComponents);

      // 5. Update design system module
      console.log('📦 Step 5: Updating design system module...');
      await this.updateDesignSystemModule(angularComponents);

      console.log('\n✅ Figma sync completed successfully!');
      console.log('\n📋 Summary:');
      console.log(`   - Design tokens: ${Object.keys(tokens.colors).length} colors, ${Object.keys(tokens.typography).length} typography styles`);
      console.log(`   - Components: ${components.length} components extracted`);
      console.log(`   - Pages: ${pages.length} pages found`);
      console.log(`   - Angular components: ${angularComponents.length} generated`);

    } catch (error) {
      console.error('❌ Error during Figma sync:', error.message);
      process.exit(1);
    }
  }

  /**
   * Save design tokens to CSS file
   */
  async saveDesignTokens(tokens) {
    const cssContent = this.generateCSSVariables(tokens);
    const tokensPath = path.join(this.outputDir, 'styles/tokens.scss');
    
    // Ensure directory exists
    const dir = path.dirname(tokensPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(tokensPath, cssContent);
    console.log(`   ✅ Design tokens saved to: ${tokensPath}`);
  }

  /**
   * Save components data
   */
  async saveComponents(components) {
    const componentsPath = path.join(this.outputDir, 'data/components.json');
    
    // Ensure directory exists
    const dir = path.dirname(componentsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(componentsPath, JSON.stringify(components, null, 2));
    console.log(`   ✅ Components data saved to: ${componentsPath}`);
  }

  /**
   * Save pages data
   */
  async savePages(pages) {
    const pagesPath = path.join(this.outputDir, 'data/pages.json');
    
    // Ensure directory exists
    const dir = path.dirname(pagesPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
    console.log(`   ✅ Pages data saved to: ${pagesPath}`);
  }

  /**
   * Generate Angular component files
   */
  async generateAngularFiles(angularComponents) {
    for (const component of angularComponents) {
      await this.generateComponentFiles(component);
    }
  }

  /**
   * Generate files for a single component
   */
  async generateComponentFiles(component) {
    const componentDir = path.join(this.outputDir, `components/${component.name.toLowerCase()}`);
    
    // Create component directory
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Generate TypeScript file
    const tsPath = path.join(componentDir, `${component.name.toLowerCase()}.component.ts`);
    fs.writeFileSync(tsPath, component.typescript);

    // Generate HTML template
    const htmlPath = path.join(componentDir, `${component.name.toLowerCase()}.component.html`);
    fs.writeFileSync(htmlPath, component.template);

    // Generate SCSS styles
    const scssPath = path.join(componentDir, `${component.name.toLowerCase()}.component.scss`);
    const scssContent = this.generateComponentSCSS(component);
    fs.writeFileSync(scssPath, scssContent);

    console.log(`   ✅ Generated ${component.name} component`);
  }

  /**
   * Generate CSS variables from tokens
   */
  generateCSSVariables(tokens) {
    let css = '/* Design System Tokens - Generated from Figma */\n';
    css += '/* Auto-generated on: ' + new Date().toISOString() + ' */\n\n';
    css += ':root {\n';

    // Colors
    if (Object.keys(tokens.colors).length > 0) {
      css += '  /* Colors */\n';
      Object.entries(tokens.colors).forEach(([name, value]) => {
        css += `  --ds-${name}: ${value};\n`;
      });
    }

    // Typography
    if (Object.keys(tokens.typography).length > 0) {
      css += '\n  /* Typography */\n';
      Object.entries(tokens.typography).forEach(([name, value]) => {
        css += `  --ds-${name}-font-family: ${value.fontFamily};\n`;
        css += `  --ds-${name}-font-size: ${value.fontSize};\n`;
        css += `  --ds-${name}-font-weight: ${value.fontWeight};\n`;
      });
    }

    // Spacing
    if (Object.keys(tokens.spacing).length > 0) {
      css += '\n  /* Spacing */\n';
      Object.entries(tokens.spacing).forEach(([name, value]) => {
        css += `  --ds-${name}: ${value.padding};\n`;
      });
    }

    // Border Radius
    if (Object.keys(tokens.borderRadius).length > 0) {
      css += '\n  /* Border Radius */\n';
      Object.entries(tokens.borderRadius).forEach(([name, value]) => {
        css += `  --ds-${name}: ${value};\n`;
      });
    }

    // Shadows
    if (Object.keys(tokens.shadows).length > 0) {
      css += '\n  /* Shadows */\n';
      Object.entries(tokens.shadows).forEach(([name, value]) => {
        css += `  --ds-${name}: ${value};\n`;
      });
    }

    css += '}\n';
    return css;
  }

  /**
   * Generate component SCSS
   */
  generateComponentSCSS(component) {
    let scss = `.ds-${component.name.toLowerCase()} {\n`;
    
    // Add base styles from Figma properties
    if (component.properties.fills && component.properties.fills.length > 0) {
      const fill = component.properties.fills[0];
      if (fill.color) {
        scss += `  background-color: var(--ds-${component.name.toLowerCase()}-color);\n`;
      }
    }

    if (component.properties.cornerRadius) {
      scss += `  border-radius: var(--ds-${component.name.toLowerCase()}-radius);\n`;
    }

    // Add variant styles
    component.variants.forEach(variant => {
      scss += `\n  &--${variant.toLowerCase()} {\n`;
      scss += `    // Add ${variant} variant styles\n`;
      scss += `  }\n`;
    });

    scss += '}\n';
    return scss;
  }

  /**
   * Update design system module
   */
  async updateDesignSystemModule(angularComponents) {
    const modulePath = path.join(this.outputDir, 'design-system.module.ts');
    
    if (!fs.existsSync(modulePath)) {
      console.warn('   ⚠️  Design system module not found. Please create it manually.');
      return;
    }

    let moduleContent = fs.readFileSync(modulePath, 'utf8');
    
    // Add imports for new components
    angularComponents.forEach(component => {
      const importStatement = `import { ${component.name}Component } from './components/${component.name.toLowerCase()}/${component.name.toLowerCase()}.component';`;
      
      if (!moduleContent.includes(importStatement)) {
        const importIndex = moduleContent.lastIndexOf('import');
        const nextLineIndex = moduleContent.indexOf('\n', importIndex) + 1;
        moduleContent = moduleContent.slice(0, nextLineIndex) + importStatement + '\n' + moduleContent.slice(nextLineIndex);
      }
    });

    // Add components to COMPONENTS array
    const componentsMatch = moduleContent.match(/const COMPONENTS = \[([\s\S]*?)\];/);
    if (componentsMatch) {
      const existingComponents = componentsMatch[1].split('\n').filter(line => line.trim());
      
      angularComponents.forEach(component => {
        const componentEntry = `  ${component.name}Component`;
        if (!existingComponents.includes(componentEntry)) {
          existingComponents.push(componentEntry);
        }
      });

      const newComponentsArray = `const COMPONENTS = [\n${existingComponents.join(',\n')}\n];`;
      moduleContent = moduleContent.replace(componentsMatch[0], newComponentsArray);
    }

    fs.writeFileSync(modulePath, moduleContent);
    console.log(`   ✅ Updated design system module`);
  }
}

/**
 * CLI usage
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  const token = args.find(arg => arg.startsWith('--token='))?.split('=')[1];
  const fileId = args.find(arg => arg.startsWith('--file='))?.split('=')[1];

  if (!token || !fileId) {
    console.error('❌ Usage: node scripts/figma-sync.js --token=YOUR_TOKEN --file=FILE_ID');
    console.error('   Get your token from: https://www.figma.com/developers/api#access-tokens');
    console.error('   Get your file ID from the Figma URL: https://www.figma.com/file/FILE_ID/...');
    process.exit(1);
  }

  const sync = new FigmaSync(token, fileId);
  sync.sync();
}

module.exports = FigmaSync; 