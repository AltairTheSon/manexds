/**
 * Enhanced Token Extractor Service
 * Extracts design tokens from Figma files with proper categorization and usage tracking
 */

const { DesignToken, FigmaNode, TOKEN_CATEGORIES, TOKEN_TYPES } = require('../types/figma-types');

class EnhancedTokenExtractor {
  constructor(config) {
    this.config = config;
    this.tokens = new Map(); // tokenId -> DesignToken
    this.styleToTokenMap = new Map(); // styleId -> tokenId
    this.nodeToTokenMap = new Map(); // nodeId -> tokenIds[]
  }

  /**
   * Extract all design tokens from a Figma file
   */
  async extractTokensFromFile(fileId, fileData) {
    console.log(`🎨 Extracting tokens from file: ${fileId}`);
    
    const tokens = [];
    
    // 1. Extract global styles (design tokens)
    if (fileData.styles) {
      const globalTokens = this.extractGlobalStyles(fileData.styles, fileId);
      tokens.push(...globalTokens);
    }
    
    // 2. Extract local styles from document structure
    if (fileData.document) {
      const localTokens = this.extractLocalStyles(fileData.document, fileId);
      tokens.push(...localTokens);
    }
    
    // 3. Categorize and organize tokens
    const categorizedTokens = this.categorizeTokens(tokens);
    
    console.log(`✅ Extracted ${tokens.length} tokens from file ${fileId}`);
    return categorizedTokens;
  }

  /**
   * Extract global styles (design tokens) from Figma file
   */
  extractGlobalStyles(styles, fileId) {
    const tokens = [];
    
    Object.entries(styles).forEach(([styleId, styleData]) => {
      try {
        const token = this.createTokenFromStyle(styleId, styleData, fileId);
        if (token) {
          tokens.push(token);
          this.styleToTokenMap.set(styleId, token.id);
        }
      } catch (error) {
        console.error(`❌ Error extracting style ${styleId}:`, error);
      }
    });
    
    return tokens;
  }

  /**
   * Extract local styles from document structure
   */
  extractLocalStyles(document, fileId) {
    const tokens = [];
    
    const extractFromNode = (node) => {
      // Extract tokens from node properties
      const nodeTokens = this.extractTokensFromNode(node, fileId);
      tokens.push(...nodeTokens);
      
      // Recursively process children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => extractFromNode(child));
      }
    };
    
    extractFromNode(document);
    return tokens;
  }

  /**
   * Extract tokens from a single node
   */
  extractTokensFromNode(node, fileId) {
    const tokens = [];
    
    if (!node || !node.id) return tokens;
    
    // Extract color tokens from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill, index) => {
        if (fill && fill.type === 'SOLID' && fill.color) {
          const token = this.createColorToken(node, fill, index, fileId);
          if (token) {
            tokens.push(token);
            this.addNodeTokenMapping(node.id, token.id);
          }
        }
      });
    }
    
    // Extract typography tokens
    if (node.type === 'TEXT' && node.style) {
      const token = this.createTypographyToken(node, fileId);
      if (token) {
        tokens.push(token);
        this.addNodeTokenMapping(node.id, token.id);
      }
    }
    
    // Extract spacing tokens
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      const token = this.createSpacingToken(node, fileId);
      if (token) {
        tokens.push(token);
        this.addNodeTokenMapping(node.id, token.id);
      }
    }
    
    // Extract border radius tokens
    if (node.cornerRadius) {
      const token = this.createBorderRadiusToken(node, fileId);
      if (token) {
        tokens.push(token);
        this.addNodeTokenMapping(node.id, token.id);
      }
    }
    
    // Extract shadow/effect tokens
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect, index) => {
        if (effect && effect.type === 'DROP_SHADOW') {
          const token = this.createShadowToken(node, effect, index, fileId);
          if (token) {
            tokens.push(token);
            this.addNodeTokenMapping(node.id, token.id);
          }
        }
      });
    }
    
    return tokens;
  }

  /**
   * Create a design token from a Figma style
   */
  createTokenFromStyle(styleId, styleData, fileId) {
    const { name, type, description } = styleData;
    
    // Determine token type and category
    const tokenType = this.mapStyleTypeToTokenType(type);
    const category = this.categorizeTokenByName(name);
    
    // Create token based on type
    switch (tokenType) {
      case TOKEN_TYPES.COLOR:
        return this.createColorTokenFromStyle(styleId, styleData, fileId, category);
      case TOKEN_TYPES.TYPOGRAPHY:
        return this.createTypographyTokenFromStyle(styleId, styleData, fileId, category);
      case TOKEN_TYPES.EFFECT:
        return this.createEffectTokenFromStyle(styleId, styleData, fileId, category);
      default:
        console.warn(`⚠️ Unknown style type: ${type} for style: ${name}`);
        return null;
    }
  }

  /**
   * Create color token from node fill
   */
  createColorToken(node, fill, index, fileId) {
    const color = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
    const name = `${node.name} Color ${index + 1}`;
    const category = this.categorizeColorByName(node.name);
    
    return new DesignToken({
      id: `${node.id}-color-${index}`,
      name: name,
      type: TOKEN_TYPES.COLOR,
      value: color,
      description: `Color from ${node.name}`,
      category: category,
      fileId: fileId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create color token from style
   */
  createColorTokenFromStyle(styleId, styleData, fileId, category) {
    // Note: Figma API doesn't provide color values in styles endpoint
    // We'll need to extract this from actual usage or document structure
    return new DesignToken({
      id: `style-${styleId}`,
      name: styleData.name,
      type: TOKEN_TYPES.COLOR,
      value: '#000000', // Placeholder - will be updated when found in usage
      description: styleData.description || `Color style: ${styleData.name}`,
      category: category,
      fileId: fileId,
      styleId: styleId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create typography token from node
   */
  createTypographyToken(node, fileId) {
    const { style } = node;
    const category = this.categorizeTypographyByName(node.name);
    
    return new DesignToken({
      id: `${node.id}-typography`,
      name: `${node.name} Typography`,
      type: TOKEN_TYPES.TYPOGRAPHY,
      value: {
        fontFamily: style.fontFamily || 'Inter',
        fontSize: style.fontSize || 16,
        fontWeight: style.fontWeight || 400,
        lineHeight: style.lineHeightPx || style.fontSize || 16,
        textAlign: style.textAlignHorizontal || 'LEFT'
      },
      description: `Typography from ${node.name}`,
      category: category,
      fileId: fileId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create typography token from style
   */
  createTypographyTokenFromStyle(styleId, styleData, fileId, category) {
    return new DesignToken({
      id: `style-${styleId}`,
      name: styleData.name,
      type: TOKEN_TYPES.TYPOGRAPHY,
      value: {
        fontFamily: 'Inter', // Will be updated when found in usage
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 16,
        textAlign: 'LEFT'
      },
      description: styleData.description || `Typography style: ${styleData.name}`,
      category: category,
      fileId: fileId,
      styleId: styleId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create spacing token from node
   */
  createSpacingToken(node, fileId) {
    const spacing = {
      padding: `${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px`,
      margin: `${node.marginTop || 0}px ${node.marginRight || 0}px ${node.marginBottom || 0}px ${node.marginLeft || 0}px`
    };
    
    const category = this.categorizeSpacingByName(node.name);
    
    return new DesignToken({
      id: `${node.id}-spacing`,
      name: `${node.name} Spacing`,
      type: TOKEN_TYPES.SPACING,
      value: spacing,
      description: `Spacing from ${node.name}`,
      category: category,
      fileId: fileId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create border radius token from node
   */
  createBorderRadiusToken(node, fileId) {
    const category = TOKEN_CATEGORIES.EFFECTS.RADIUS;
    
    return new DesignToken({
      id: `${node.id}-radius`,
      name: `${node.name} Border Radius`,
      type: TOKEN_TYPES.BORDER_RADIUS,
      value: node.cornerRadius,
      description: `Border radius from ${node.name}`,
      category: category,
      fileId: fileId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create shadow token from node effect
   */
  createShadowToken(node, effect, index, fileId) {
    const shadow = this.formatShadow(effect);
    const category = TOKEN_CATEGORIES.EFFECTS.SHADOWS;
    
    return new DesignToken({
      id: `${node.id}-shadow-${index}`,
      name: `${node.name} Shadow ${index + 1}`,
      type: TOKEN_TYPES.SHADOW,
      value: shadow,
      description: `Shadow from ${node.name}`,
      category: category,
      fileId: fileId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Create effect token from style
   */
  createEffectTokenFromStyle(styleId, styleData, fileId, category) {
    return new DesignToken({
      id: `style-${styleId}`,
      name: styleData.name,
      type: TOKEN_TYPES.EFFECT,
      value: '', // Will be updated when found in usage
      description: styleData.description || `Effect style: ${styleData.name}`,
      category: category,
      fileId: fileId,
      styleId: styleId,
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Categorize tokens by name and type
   */
  categorizeTokens(tokens) {
    return tokens.map(token => {
      if (!token.category) {
        token.category = this.categorizeTokenByName(token.name);
      }
      return token;
    });
  }

  /**
   * Categorize token by name
   */
  categorizeTokenByName(name) {
    const lowerName = name.toLowerCase();
    
    // Color categorization
    if (lowerName.includes('primary') || lowerName.includes('brand')) {
      return TOKEN_CATEGORIES.COLORS.PRIMARY;
    }
    if (lowerName.includes('secondary')) {
      return TOKEN_CATEGORIES.COLORS.SECONDARY;
    }
    if (lowerName.includes('neutral') || lowerName.includes('gray')) {
      return TOKEN_CATEGORIES.COLORS.NEUTRAL;
    }
    if (lowerName.includes('success') || lowerName.includes('error') || lowerName.includes('warning')) {
      return TOKEN_CATEGORIES.COLORS.SEMANTIC;
    }
    if (lowerName.includes('background') || lowerName.includes('bg')) {
      return TOKEN_CATEGORIES.COLORS.BACKGROUND;
    }
    if (lowerName.includes('text') || lowerName.includes('font')) {
      return TOKEN_CATEGORIES.COLORS.TEXT;
    }
    
    // Typography categorization
    if (lowerName.includes('heading') || lowerName.includes('h1') || lowerName.includes('h2')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.HEADINGS;
    }
    if (lowerName.includes('body') || lowerName.includes('paragraph')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.BODY;
    }
    if (lowerName.includes('caption') || lowerName.includes('small')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.CAPTIONS;
    }
    if (lowerName.includes('button')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.BUTTONS;
    }
    
    // Spacing categorization
    if (lowerName.includes('layout') || lowerName.includes('container')) {
      return TOKEN_CATEGORIES.SPACING.LAYOUT;
    }
    if (lowerName.includes('component') || lowerName.includes('element')) {
      return TOKEN_CATEGORIES.SPACING.COMPONENT;
    }
    if (lowerName.includes('text') || lowerName.includes('line')) {
      return TOKEN_CATEGORIES.SPACING.TEXT;
    }
    
    // Default categorization
    if (lowerName.includes('color') || lowerName.includes('fill')) {
      return TOKEN_CATEGORIES.COLORS.PRIMARY;
    }
    if (lowerName.includes('font') || lowerName.includes('text')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.BODY;
    }
    if (lowerName.includes('spacing') || lowerName.includes('padding') || lowerName.includes('margin')) {
      return TOKEN_CATEGORIES.SPACING.COMPONENT;
    }
    
    return 'uncategorized';
  }

  /**
   * Categorize color by name
   */
  categorizeColorByName(name) {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('primary') || lowerName.includes('brand')) {
      return TOKEN_CATEGORIES.COLORS.PRIMARY;
    }
    if (lowerName.includes('secondary')) {
      return TOKEN_CATEGORIES.COLORS.SECONDARY;
    }
    if (lowerName.includes('neutral') || lowerName.includes('gray')) {
      return TOKEN_CATEGORIES.COLORS.NEUTRAL;
    }
    if (lowerName.includes('success') || lowerName.includes('error') || lowerName.includes('warning')) {
      return TOKEN_CATEGORIES.COLORS.SEMANTIC;
    }
    if (lowerName.includes('background') || lowerName.includes('bg')) {
      return TOKEN_CATEGORIES.COLORS.BACKGROUND;
    }
    if (lowerName.includes('text') || lowerName.includes('font')) {
      return TOKEN_CATEGORIES.COLORS.TEXT;
    }
    
    return TOKEN_CATEGORIES.COLORS.PRIMARY;
  }

  /**
   * Categorize typography by name
   */
  categorizeTypographyByName(name) {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('heading') || lowerName.includes('h1') || lowerName.includes('h2')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.HEADINGS;
    }
    if (lowerName.includes('body') || lowerName.includes('paragraph')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.BODY;
    }
    if (lowerName.includes('caption') || lowerName.includes('small')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.CAPTIONS;
    }
    if (lowerName.includes('button')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY.BUTTONS;
    }
    
    return TOKEN_CATEGORIES.TYPOGRAPHY.BODY;
  }

  /**
   * Categorize spacing by name
   */
  categorizeSpacingByName(name) {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('layout') || lowerName.includes('container')) {
      return TOKEN_CATEGORIES.SPACING.LAYOUT;
    }
    if (lowerName.includes('component') || lowerName.includes('element')) {
      return TOKEN_CATEGORIES.SPACING.COMPONENT;
    }
    if (lowerName.includes('text') || lowerName.includes('line')) {
      return TOKEN_CATEGORIES.SPACING.TEXT;
    }
    
    return TOKEN_CATEGORIES.SPACING.COMPONENT;
  }

  /**
   * Map Figma style type to token type
   */
  mapStyleTypeToTokenType(styleType) {
    switch (styleType) {
      case 'FILL':
        return TOKEN_TYPES.COLOR;
      case 'TEXT':
        return TOKEN_TYPES.TYPOGRAPHY;
      case 'EFFECT':
        return TOKEN_TYPES.EFFECT;
      default:
        return TOKEN_TYPES.COLOR;
    }
  }

  /**
   * Add node to token mapping
   */
  addNodeTokenMapping(nodeId, tokenId) {
    if (!this.nodeToTokenMap.has(nodeId)) {
      this.nodeToTokenMap.set(nodeId, []);
    }
    this.nodeToTokenMap.get(nodeId).push(tokenId);
  }

  /**
   * Get tokens used by a node
   */
  getTokensForNode(nodeId) {
    return this.nodeToTokenMap.get(nodeId) || [];
  }

  /**
   * Get token by style ID
   */
  getTokenByStyleId(styleId) {
    const tokenId = this.styleToTokenMap.get(styleId);
    return tokenId ? this.tokens.get(tokenId) : null;
  }

  /**
   * Utility: Convert RGBA to Hex
   */
  rgbaToHex(r, g, b, a = 1) {
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return a < 1 ? `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}` : hex;
  }

  /**
   * Utility: Format shadow effect
   */
  formatShadow(effect) {
    const { color, offset, radius, spread } = effect;
    const hexColor = this.rgbaToHex(color.r, color.g, color.b, color.a);
    return `${offset.x}px ${offset.y}px ${radius}px ${spread || 0}px ${hexColor}`;
  }

  /**
   * Get all tokens
   */
  getAllTokens() {
    return Array.from(this.tokens.values());
  }

  /**
   * Get tokens by type
   */
  getTokensByType(type) {
    return this.getAllTokens().filter(token => token.type === type);
  }

  /**
   * Get tokens by category
   */
  getTokensByCategory(category) {
    return this.getAllTokens().filter(token => token.category === category);
  }
}

module.exports = EnhancedTokenExtractor; 