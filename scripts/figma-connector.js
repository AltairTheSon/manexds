const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Figma API Connector
 * Connects to Figma API to extract design tokens, components, and pages
 */

class FigmaConnector {
  constructor(token, fileId) {
    this.token = token;
    this.fileId = fileId;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  /**
   * Make a request to Figma API
   */
  async makeRequest(endpoint) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.figma.com',
        path: `/v1${endpoint}`,
        method: 'GET',
        headers: {
          'X-Figma-Token': this.token,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  /**
   * Get the entire Figma file
   */
  async getFile() {
    console.log('📁 Fetching Figma file...');
    return await this.makeRequest(`/files/${this.fileId}`);
  }

  /**
   * Get specific nodes from the file
   */
  async getNodes(nodeIds) {
    console.log('🔍 Fetching specific nodes...');
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    return await this.makeRequest(`/files/${this.fileId}/nodes?ids=${ids}`);
  }

  /**
   * Get images from the file
   */
  async getImages(nodeIds, format = 'png', scale = 1) {
    console.log('🖼️ Fetching images...');
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    return await this.makeRequest(`/images/${this.fileId}?ids=${ids}&format=${format}&scale=${scale}`);
  }

  /**
   * Extract design tokens from Figma file
   */
  async extractDesignTokens() {
    console.log('🎨 Extracting design tokens...');
    
    const file = await this.getFile();
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      shadows: {},
      borderRadius: {}
    };

    // Recursively traverse the document to find styles
    this.traverseNodes(file.document, tokens);

    return tokens;
  }

  /**
   * Traverse nodes to extract design tokens
   */
  traverseNodes(node, tokens) {
    // Extract colors from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          const color = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
          const colorName = this.generateColorName(node.name, fill);
          if (!tokens.colors[colorName]) {
            tokens.colors[colorName] = color;
          }
        }
      });
    }

    // Extract typography
    if (node.style) {
      const fontFamily = node.style.fontFamily;
      const fontSize = node.style.fontSize;
      const fontWeight = node.style.fontWeight;
      
      if (fontFamily || fontSize || fontWeight) {
        const typographyKey = this.generateTypographyKey(node.name);
        tokens.typography[typographyKey] = {
          fontFamily: fontFamily || 'Inter',
          fontSize: fontSize ? `${fontSize}px` : '16px',
          fontWeight: fontWeight || '400'
        };
      }
    }

    // Extract spacing from layout
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      const spacingKey = this.generateSpacingKey(node.name);
      tokens.spacing[spacingKey] = {
        padding: `${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px`
      };
    }

    // Extract border radius
    if (node.cornerRadius) {
      const radiusKey = this.generateRadiusKey(node.name);
      tokens.borderRadius[radiusKey] = `${node.cornerRadius}px`;
    }

    // Extract shadows
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach(effect => {
        if (effect.type === 'DROP_SHADOW') {
          const shadowKey = this.generateShadowKey(node.name);
          tokens.shadows[shadowKey] = this.formatShadow(effect);
        }
      });
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => this.traverseNodes(child, tokens));
    }
  }

  /**
   * Extract components from Figma file
   */
  async extractComponents() {
    console.log('🧩 Extracting components...');
    
    const file = await this.getFile();
    const components = [];

    this.findComponents(file.document, components);

    return components;
  }

  /**
   * Find all components in the document
   */
  findComponents(node, components) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        description: node.description || '',
        variants: this.extractVariants(node),
        properties: this.extractProperties(node)
      });
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => this.findComponents(child, components));
    }
  }

  /**
   * Extract component variants
   */
  extractVariants(component) {
    const variants = [];
    
    if (component.children && Array.isArray(component.children)) {
      component.children.forEach(child => {
        if (child.type === 'INSTANCE') {
          variants.push({
            name: child.name,
            properties: this.extractProperties(child)
          });
        }
      });
    }

    return variants;
  }

  /**
   * Extract component properties
   */
  extractProperties(node) {
    return {
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      fills: node.fills,
      strokes: node.strokes,
      effects: node.effects,
      cornerRadius: node.cornerRadius,
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom
    };
  }

  /**
   * Extract pages from Figma file
   */
  async extractPages() {
    console.log('📄 Extracting pages...');
    
    const file = await this.getFile();
    const pages = [];

    file.document.children.forEach(page => {
      pages.push({
        id: page.id,
        name: page.name,
        type: page.type,
        children: page.children ? page.children.length : 0
      });
    });

    return pages;
  }

  /**
   * Generate Angular components from Figma components
   */
  async generateAngularComponents() {
    console.log('⚡ Generating Angular components...');
    
    const components = await this.extractComponents();
    const generatedComponents = [];

    for (const component of components) {
      const componentData = await this.generateComponentFromFigma(component);
      generatedComponents.push(componentData);
    }

    return generatedComponents;
  }

  /**
   * Generate a single Angular component from Figma component
   */
  async generateComponentFromFigma(figmaComponent) {
    const componentName = this.sanitizeComponentName(figmaComponent.name);
    const variants = this.extractVariantNames(figmaComponent);
    
    return {
      name: componentName,
      figmaId: figmaComponent.id,
      variants: variants,
      properties: figmaComponent.properties,
      template: this.generateComponentTemplate(componentName, variants),
      styles: this.generateComponentStyles(figmaComponent),
      typescript: this.generateComponentTypeScript(componentName, variants)
    };
  }

  /**
   * Helper methods
   */
  rgbaToHex(r, g, b, a = 1) {
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  generateColorName(nodeName, fill) {
    return nodeName.toLowerCase().replace(/\s+/g, '-') + '-color';
  }

  generateTypographyKey(nodeName) {
    return nodeName.toLowerCase().replace(/\s+/g, '-') + '-typography';
  }

  generateSpacingKey(nodeName) {
    return nodeName.toLowerCase().replace(/\s+/g, '-') + '-spacing';
  }

  generateRadiusKey(nodeName) {
    return nodeName.toLowerCase().replace(/\s+/g, '-') + '-radius';
  }

  generateShadowKey(nodeName) {
    return nodeName.toLowerCase().replace(/\s+/g, '-') + '-shadow';
  }

  formatShadow(effect) {
    const { offset, radius, color } = effect;
    const { r, g, b, a } = color;
    const rgba = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
    return `${offset.x}px ${offset.y}px ${radius}px ${rgba}`;
  }

  sanitizeComponentName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').replace(/^[0-9]/, '');
  }

  extractVariantNames(component) {
    if (component.variants) {
      return component.variants.map(v => v.name);
    }
    return [];
  }

  generateComponentTemplate(componentName, variants) {
    return `<div class="ds-${componentName.toLowerCase()}">
  <ng-content></ng-content>
</div>`;
  }

  generateComponentStyles(component) {
    const styles = [];
    
    if (component.properties.fills) {
      styles.push(`background-color: ${this.rgbaToHex(...component.properties.fills[0].color)};`);
    }
    
    if (component.properties.cornerRadius) {
      styles.push(`border-radius: ${component.properties.cornerRadius}px;`);
    }
    
    return styles.join('\n  ');
  }

  generateComponentTypeScript(componentName, variants) {
    const variantTypes = variants.length > 0 ? variants.map(v => `'${v}'`).join(' | ') : 'string';
    
    return `import { Component, Input } from '@angular/core';

export type ${componentName}Variant = ${variantTypes};

@Component({
  selector: 'ds-${componentName.toLowerCase()}',
  templateUrl: './${componentName.toLowerCase()}.component.html',
  styleUrls: ['./${componentName.toLowerCase()}.component.scss']
})
export class ${componentName}Component {
  @Input() variant: ${componentName}Variant = '${variants[0] || 'default'}';
}`;
  }
}

module.exports = FigmaConnector; 