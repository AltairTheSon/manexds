/**
 * Enhanced Component Extractor Service
 * Extracts components from Figma files and links them to design tokens
 */

const { FigmaComponent, FigmaNode, TOKEN_TYPES } = require('../types/figma-types');

class EnhancedComponentExtractor {
  constructor(config, tokenExtractor) {
    this.config = config;
    this.tokenExtractor = tokenExtractor;
    this.components = new Map(); // componentId -> FigmaComponent
    this.componentToTokensMap = new Map(); // componentId -> tokenIds[]
  }

  /**
   * Extract all components from a Figma file
   */
  async extractComponentsFromFile(fileId, fileData) {
    console.log(`🧩 Extracting components from file: ${fileId}`);
    
    const components = [];
    
    // 1. Extract components from document structure
    if (fileData.document) {
      const documentComponents = this.extractComponentsFromDocument(fileData.document, fileId);
      components.push(...documentComponents);
    }
    
    // 2. Extract component sets and their variants
    if (fileData.componentSets) {
      const componentSetComponents = this.extractComponentSets(fileData.componentSets, fileId);
      components.push(...componentSetComponents);
    }
    
    // 3. Extract individual components
    if (fileData.components) {
      const individualComponents = this.extractIndividualComponents(fileData.components, fileId);
      components.push(...individualComponents);
    }
    
    // 4. Link components to tokens
    const linkedComponents = await this.linkComponentsToTokens(components, fileData);
    
    console.log(`✅ Extracted ${components.length} components from file ${fileId}`);
    return linkedComponents;
  }

  /**
   * Extract components from document structure
   */
  extractComponentsFromDocument(document, fileId) {
    const components = [];
    
    const extractFromNode = (node, pageId = '', frameId = '') => {
      // Check if node is a component
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        const component = this.createComponentFromNode(node, fileId, pageId, frameId);
        if (component) {
          components.push(component);
        }
      }
      
      // Update page and frame IDs as we traverse
      let currentPageId = pageId;
      let currentFrameId = frameId;
      
      if (node.type === 'CANVAS') {
        currentPageId = node.id;
      } else if (node.type === 'FRAME') {
        currentFrameId = node.id;
      }
      
      // Recursively process children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => extractFromNode(child, currentPageId, currentFrameId));
      }
    };
    
    extractFromNode(document);
    return components;
  }

  /**
   * Extract component sets and their variants
   */
  extractComponentSets(componentSets, fileId) {
    const components = [];
    
    Object.entries(componentSets).forEach(([componentSetId, componentSetData]) => {
      try {
        const componentSet = this.createComponentSetFromData(componentSetId, componentSetData, fileId);
        if (componentSet) {
          components.push(componentSet);
        }
      } catch (error) {
        console.error(`❌ Error extracting component set ${componentSetId}:`, error);
      }
    });
    
    return components;
  }

  /**
   * Extract individual components
   */
  extractIndividualComponents(componentsData, fileId) {
    const components = [];
    
    Object.entries(componentsData).forEach(([componentId, componentData]) => {
      try {
        const component = this.createComponentFromData(componentId, componentData, fileId);
        if (component) {
          components.push(component);
        }
      } catch (error) {
        console.error(`❌ Error extracting component ${componentId}:`, error);
      }
    });
    
    return components;
  }

  /**
   * Create component from node data
   */
  createComponentFromNode(node, fileId, pageId, frameId) {
    if (!node || !node.id || !node.name) {
      return null;
    }
    
    const component = new FigmaComponent({
      id: node.id,
      name: node.name,
      type: node.type,
      description: node.description || '',
      fileId: fileId,
      pageId: pageId,
      frameId: frameId,
      absoluteBoundingBox: node.absoluteBoundingBox || {
        x: 0,
        y: 0,
        width: 200,
        height: 100
      },
      children: this.extractChildrenFromNode(node),
      lastModified: new Date().toISOString()
    });
    
    // Extract component properties
    component.properties = this.extractComponentProperties(node);
    
    // Extract variants if it's a component set
    if (node.type === 'COMPONENT_SET' && node.children) {
      component.variants = this.extractComponentVariants(node.children, fileId, pageId, frameId);
    }
    
    return component;
  }

  /**
   * Create component set from data
   */
  createComponentSetFromData(componentSetId, componentSetData, fileId) {
    const componentSet = new FigmaComponent({
      id: componentSetId,
      name: componentSetData.name,
      type: 'COMPONENT_SET',
      description: componentSetData.description || '',
      fileId: fileId,
      properties: componentSetData.componentPropertyReferences || {},
      lastModified: new Date().toISOString()
    });
    
    return componentSet;
  }

  /**
   * Create component from data
   */
  createComponentFromData(componentId, componentData, fileId) {
    const component = new FigmaComponent({
      id: componentId,
      name: componentData.name,
      type: 'COMPONENT',
      description: componentData.description || '',
      fileId: fileId,
      componentSetId: componentData.componentSetId || null,
      properties: componentData.componentProperties || {},
      lastModified: new Date().toISOString()
    });
    
    return component;
  }

  /**
   * Extract children from node
   */
  extractChildrenFromNode(node) {
    const children = [];
    
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        const figmaNode = this.createFigmaNodeFromData(child);
        if (figmaNode) {
          children.push(figmaNode);
        }
      });
    }
    
    return children;
  }

  /**
   * Create FigmaNode from data
   */
  createFigmaNodeFromData(nodeData) {
    if (!nodeData || !nodeData.id) {
      return null;
    }
    
    const node = new FigmaNode({
      id: nodeData.id,
      name: nodeData.name,
      type: nodeData.type,
      fills: nodeData.fills || [],
      strokes: nodeData.strokes || [],
      effects: nodeData.effects || [],
      cornerRadius: nodeData.cornerRadius || 0,
      characters: nodeData.characters || '',
      style: nodeData.style || {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 400,
        textAlignHorizontal: 'LEFT'
      },
      absoluteBoundingBox: nodeData.absoluteBoundingBox || {
        x: 0,
        y: 0,
        width: 100,
        height: 50
      }
    });
    
    // Extract style references
    node.styleReferences = this.extractStyleReferences(nodeData);
    
    // Recursively process children
    if (nodeData.children && Array.isArray(nodeData.children)) {
      node.children = nodeData.children.map(child => this.createFigmaNodeFromData(child)).filter(Boolean);
    }
    
    return node;
  }

  /**
   * Extract style references from node
   */
  extractStyleReferences(nodeData) {
    const styleReferences = {
      fill: null,
      stroke: null,
      text: null,
      effect: null,
      cornerRadius: null
    };
    
    // Check for style references in fills
    if (nodeData.fills && Array.isArray(nodeData.fills)) {
      nodeData.fills.forEach(fill => {
        if (fill && fill.styles && fill.styles.fill) {
          styleReferences.fill = fill.styles.fill;
        }
      });
    }
    
    // Check for style references in strokes
    if (nodeData.strokes && Array.isArray(nodeData.strokes)) {
      nodeData.strokes.forEach(stroke => {
        if (stroke && stroke.styles && stroke.styles.stroke) {
          styleReferences.stroke = stroke.styles.stroke;
        }
      });
    }
    
    // Check for text style references
    if (nodeData.styles && nodeData.styles.text) {
      styleReferences.text = nodeData.styles.text;
    }
    
    // Check for effect style references
    if (nodeData.styles && nodeData.styles.effect) {
      styleReferences.effect = nodeData.styles.effect;
    }
    
    return styleReferences;
  }

  /**
   * Extract component properties
   */
  extractComponentProperties(node) {
    const properties = {};
    
    if (node.componentPropertyReferences) {
      Object.entries(node.componentPropertyReferences).forEach(([key, value]) => {
        properties[key] = {
          type: this.determinePropertyType(value),
          value: value,
          description: `Property: ${key}`
        };
      });
    }
    
    if (node.componentProperties) {
      Object.entries(node.componentProperties).forEach(([key, value]) => {
        if (!properties[key]) {
          properties[key] = {
            type: this.determinePropertyType(value),
            value: value,
            description: `Property: ${key}`
          };
        }
      });
    }
    
    return properties;
  }

  /**
   * Determine property type
   */
  determinePropertyType(value) {
    if (typeof value === 'boolean') {
      return 'BOOLEAN';
    } else if (typeof value === 'string') {
      return 'TEXT';
    } else if (typeof value === 'object' && value.type) {
      return value.type;
    }
    return 'TEXT';
  }

  /**
   * Extract component variants
   */
  extractComponentVariants(children, fileId, pageId, frameId) {
    const variants = [];
    
    children.forEach(child => {
      if (child.type === 'COMPONENT') {
        const variant = this.createComponentFromNode(child, fileId, pageId, frameId);
        if (variant) {
          variants.push(variant);
        }
      }
    });
    
    return variants;
  }

  /**
   * Link components to tokens
   */
  async linkComponentsToTokens(components, fileData) {
    console.log(`🔗 Linking ${components.length} components to tokens...`);
    
    const linkedComponents = components.map(component => {
      // Find tokens used by this component
      const usedTokens = this.findComponentTokenUsage(component, fileData);
      
      // Update component with token usage
      component.usedTokens = usedTokens;
      
      // Store mapping for quick lookup
      this.componentToTokensMap.set(component.id, this.flattenTokenUsage(usedTokens));
      
      return component;
    });
    
    console.log(`✅ Linked ${linkedComponents.length} components to tokens`);
    return linkedComponents;
  }

  /**
   * Find token usage for a component
   */
  findComponentTokenUsage(component, fileData) {
    const usedTokens = {
      colors: [],
      typography: [],
      spacing: [],
      effects: []
    };
    
    // Traverse component tree to find token usage
    this.traverseComponentForTokenUsage(component, usedTokens, fileData);
    
    return usedTokens;
  }

  /**
   * Traverse component tree for token usage
   */
  traverseComponentForTokenUsage(component, usedTokens, fileData) {
    // Check component's own style references
    if (component.styleReferences) {
      this.processStyleReferences(component.styleReferences, usedTokens, fileData);
    }
    
    // Traverse children
    if (component.children && Array.isArray(component.children)) {
      component.children.forEach(child => {
        this.traverseNodeForTokenUsage(child, usedTokens, fileData);
      });
    }
    
    // Check variants
    if (component.variants && Array.isArray(component.variants)) {
      component.variants.forEach(variant => {
        this.traverseComponentForTokenUsage(variant, usedTokens, fileData);
      });
    }
  }

  /**
   * Traverse node for token usage
   */
  traverseNodeForTokenUsage(node, usedTokens, fileData) {
    // Check node's style references
    if (node.styleReferences) {
      this.processStyleReferences(node.styleReferences, usedTokens, fileData);
    }
    
    // Check node's direct properties for tokens
    this.processNodeProperties(node, usedTokens);
    
    // Traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        this.traverseNodeForTokenUsage(child, usedTokens, fileData);
      });
    }
  }

  /**
   * Process style references
   */
  processStyleReferences(styleReferences, usedTokens, fileData) {
    Object.entries(styleReferences).forEach(([property, styleId]) => {
      if (styleId && fileData.styles && fileData.styles[styleId]) {
        const style = fileData.styles[styleId];
        const tokenType = this.mapStyleTypeToTokenType(style.type);
        
        // Create token ID for this style
        const tokenId = `style-${styleId}`;
        
        // Add to appropriate category
        switch (tokenType) {
          case TOKEN_TYPES.COLOR:
            if (!usedTokens.colors.includes(tokenId)) {
              usedTokens.colors.push(tokenId);
            }
            break;
          case TOKEN_TYPES.TYPOGRAPHY:
            if (!usedTokens.typography.includes(tokenId)) {
              usedTokens.typography.push(tokenId);
            }
            break;
          case TOKEN_TYPES.EFFECT:
            if (!usedTokens.effects.includes(tokenId)) {
              usedTokens.effects.push(tokenId);
            }
            break;
        }
      }
    });
  }

  /**
   * Process node properties for tokens
   */
  processNodeProperties(node, usedTokens) {
    // Check for color tokens in fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill && fill.type === 'SOLID' && fill.color) {
          // This would be a local color token
          const tokenId = `${node.id}-color`;
          if (!usedTokens.colors.includes(tokenId)) {
            usedTokens.colors.push(tokenId);
          }
        }
      });
    }
    
    // Check for typography tokens
    if (node.type === 'TEXT' && node.style) {
      const tokenId = `${node.id}-typography`;
      if (!usedTokens.typography.includes(tokenId)) {
        usedTokens.typography.push(tokenId);
      }
    }
    
    // Check for spacing tokens
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      const tokenId = `${node.id}-spacing`;
      if (!usedTokens.spacing.includes(tokenId)) {
        usedTokens.spacing.push(tokenId);
      }
    }
    
    // Check for effect tokens
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect, index) => {
        if (effect && effect.type === 'DROP_SHADOW') {
          const tokenId = `${node.id}-shadow-${index}`;
          if (!usedTokens.effects.includes(tokenId)) {
            usedTokens.effects.push(tokenId);
          }
        }
      });
    }
  }

  /**
   * Map style type to token type
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
   * Flatten token usage to array
   */
  flattenTokenUsage(usedTokens) {
    const allTokens = [];
    Object.values(usedTokens).forEach(tokenArray => {
      allTokens.push(...tokenArray);
    });
    return allTokens;
  }

  /**
   * Get tokens used by a component
   */
  getTokensForComponent(componentId) {
    return this.componentToTokensMap.get(componentId) || [];
  }

  /**
   * Get all components
   */
  getAllComponents() {
    return Array.from(this.components.values());
  }

  /**
   * Get components by type
   */
  getComponentsByType(type) {
    return this.getAllComponents().filter(component => component.type === type);
  }

  /**
   * Get components that use a specific token
   */
  getComponentsUsingToken(tokenId) {
    const components = [];
    
    this.componentToTokensMap.forEach((tokenIds, componentId) => {
      if (tokenIds.includes(tokenId)) {
        const component = this.components.get(componentId);
        if (component) {
          components.push(component);
        }
      }
    });
    
    return components;
  }
}

module.exports = EnhancedComponentExtractor; 