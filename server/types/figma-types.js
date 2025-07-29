/**
 * Enhanced Figma Data Types
 * Provides type definitions for improved token and component handling
 */

// Enhanced Token Model
class DesignToken {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'color'; // 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow' | 'effect'
    this.value = data.value || null;
    this.description = data.description || '';
    this.category = data.category || ''; // e.g., "colors/primary", "typography/headings"
    this.fileId = data.fileId || '';
    this.styleId = data.styleId || ''; // Figma style ID
    this.usage = data.usage || []; // Component IDs that use this token
    this.variants = data.variants || {}; // For responsive/theme variants
    this.lastModified = data.lastModified || new Date().toISOString();
  }

  // Helper methods
  getCssVariableName() {
    return `--${this.category.replace('/', '-').toLowerCase()}`;
  }

  getCssValue() {
    switch (this.type) {
      case 'color':
        return this.value;
      case 'typography':
        return `${this.value.fontSize} ${this.value.fontWeight} ${this.value.fontFamily}`;
      case 'spacing':
        return `${this.value}px`;
      case 'borderRadius':
        return `${this.value}px`;
      case 'shadow':
        return this.value;
      default:
        return this.value;
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
      description: this.description,
      category: this.category,
      fileId: this.fileId,
      styleId: this.styleId,
      usage: this.usage,
      variants: this.variants,
      lastModified: this.lastModified
    };
  }
}

// Enhanced Component Model
class FigmaComponent {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'COMPONENT'; // 'COMPONENT' | 'COMPONENT_SET'
    this.description = data.description || '';
    this.fileId = data.fileId || '';
    this.pageId = data.pageId || '';
    this.frameId = data.frameId || '';
    
    // Token References
    this.usedTokens = data.usedTokens || {
      colors: [],
      typography: [],
      spacing: [],
      effects: []
    };
    
    // Component Properties
    this.properties = data.properties || {};
    
    // Variants (for component sets)
    this.variants = data.variants || [];
    
    // Visual Properties
    this.absoluteBoundingBox = data.absoluteBoundingBox || {
      x: 0,
      y: 0,
      width: 200,
      height: 100
    };
    
    // Children with token references
    this.children = data.children || [];
    
    // Preview URLs
    this.preview = data.preview || {
      image: '',
      html: ''
    };
    
    this.lastModified = data.lastModified || new Date().toISOString();
  }

  // Helper methods
  getUsedTokenIds() {
    const allTokens = [];
    Object.values(this.usedTokens).forEach(tokenArray => {
      allTokens.push(...tokenArray);
    });
    return allTokens;
  }

  hasTokenUsage() {
    return this.getUsedTokenIds().length > 0;
  }

  addTokenUsage(tokenId, tokenType) {
    if (this.usedTokens[tokenType] && !this.usedTokens[tokenType].includes(tokenId)) {
      this.usedTokens[tokenType].push(tokenId);
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      fileId: this.fileId,
      pageId: this.pageId,
      frameId: this.frameId,
      usedTokens: this.usedTokens,
      properties: this.properties,
      variants: this.variants,
      absoluteBoundingBox: this.absoluteBoundingBox,
      children: this.children,
      preview: this.preview,
      lastModified: this.lastModified
    };
  }
}

// Enhanced Node Model with Token References
class FigmaNode {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || '';
    
    // Token References
    this.styleReferences = data.styleReferences || {
      fill: null,
      stroke: null,
      text: null,
      effect: null,
      cornerRadius: null
    };
    
    // Visual Properties
    this.fills = data.fills || [];
    this.strokes = data.strokes || [];
    this.effects = data.effects || [];
    this.cornerRadius = data.cornerRadius || 0;
    
    // Text Properties
    this.characters = data.characters || '';
    this.style = data.style || {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 400,
      textAlignHorizontal: 'LEFT'
    };
    
    // Layout Properties
    this.absoluteBoundingBox = data.absoluteBoundingBox || {
      x: 0,
      y: 0,
      width: 100,
      height: 50
    };
    
    this.children = data.children || [];
  }

  // Helper methods
  hasStyleReference() {
    return Object.values(this.styleReferences).some(ref => ref !== null);
  }

  getStyleReference(property) {
    return this.styleReferences[property] || null;
  }

  setStyleReference(property, tokenId) {
    this.styleReferences[property] = tokenId;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      styleReferences: this.styleReferences,
      fills: this.fills,
      strokes: this.strokes,
      effects: this.effects,
      cornerRadius: this.cornerRadius,
      characters: this.characters,
      style: this.style,
      absoluteBoundingBox: this.absoluteBoundingBox,
      children: this.children
    };
  }
}

// Enhanced File Model
class FigmaFile {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'design-system'; // 'design-system' | 'application' | 'prototype'
    this.description = data.description || '';
    this.priority = data.priority || 1;
    this.lastModified = data.lastModified || new Date().toISOString();
    this.version = data.version || '';
    
    // File content
    this.tokens = data.tokens || [];
    this.components = data.components || [];
    this.pages = data.pages || [];
  }

  // Helper methods
  getTokensByType(type) {
    return this.tokens.filter(token => token.type === type);
  }

  getTokensByCategory(category) {
    return this.tokens.filter(token => token.category === category);
  }

  getComponentsByType(type) {
    return this.components.filter(component => component.type === type);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      priority: this.priority,
      lastModified: this.lastModified,
      version: this.version,
      tokens: this.tokens,
      components: this.components,
      pages: this.pages
    };
  }
}

// Token Categories for organization
const TOKEN_CATEGORIES = {
  COLORS: {
    PRIMARY: 'colors/primary',
    SECONDARY: 'colors/secondary',
    NEUTRAL: 'colors/neutral',
    SEMANTIC: 'colors/semantic',
    BACKGROUND: 'colors/background',
    TEXT: 'colors/text'
  },
  TYPOGRAPHY: {
    HEADINGS: 'typography/headings',
    BODY: 'typography/body',
    CAPTIONS: 'typography/captions',
    BUTTONS: 'typography/buttons'
  },
  SPACING: {
    LAYOUT: 'spacing/layout',
    COMPONENT: 'spacing/component',
    TEXT: 'spacing/text'
  },
  EFFECTS: {
    SHADOWS: 'effects/shadows',
    BORDERS: 'effects/borders',
    RADIUS: 'effects/radius'
  }
};

// Token Types
const TOKEN_TYPES = {
  COLOR: 'color',
  TYPOGRAPHY: 'typography',
  SPACING: 'spacing',
  BORDER_RADIUS: 'borderRadius',
  SHADOW: 'shadow',
  EFFECT: 'effect'
};

module.exports = {
  DesignToken,
  FigmaComponent,
  FigmaNode,
  FigmaFile,
  TOKEN_CATEGORIES,
  TOKEN_TYPES
}; 