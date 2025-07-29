# 🎨 Enhanced Figma Architecture for Multi-File Support

## 📋 Figma Data Structure Deep Dive

### **1. Figma's Hierarchical Organization**

```
🏢 Figma Team/Organization
├── 📁 Projects
│   ├── 📄 Design System Files
│   │   ├── 🎨 Global Styles (Tokens)
│   │   ├── 🧩 Component Library
│   │   └── 📏 Spacing & Layout Systems
│   ├── 📄 Application Files
│   │   ├── 📱 Mobile App Screens
│   │   ├── 💻 Web App Pages
│   │   └── 🎨 Marketing Assets
│   └── 📄 Prototype Files
│       ├── 🔄 User Flows
│       ├── 🎯 Interactive Prototypes
│       └── 📸 Screenshots & Mockups
```

### **2. File-Level Structure**

```javascript
// Figma File Structure
{
  "id": "file-id",
  "name": "Design System",
  "lastModified": "2024-01-01T00:00:00Z",
  "version": "123",
  "document": {
    "id": "document-id",
    "name": "Document",
    "type": "DOCUMENT",
    "children": [
      // Pages (Artboards)
      {
        "id": "page-1",
        "name": "Design System",
        "type": "CANVAS",
        "children": [
          // Frames/Artboards
          {
            "id": "frame-1",
            "name": "Colors",
            "type": "FRAME",
            "children": [
              // Color Styles
              {
                "id": "color-1",
                "name": "Primary/Blue",
                "type": "RECTANGLE",
                "fills": [{"type": "SOLID", "color": {"r": 0.2, "g": 0.4, "b": 0.8, "a": 1}}],
                "styles": {"fill": "style-id-1"}
              }
            ]
          }
        ]
      }
    ]
  },
  "styles": {
    // Global Styles (Tokens)
    "style-id-1": {
      "id": "style-id-1",
      "name": "Primary/Blue",
      "type": "FILL",
      "description": "Primary brand color",
      "remote": false,
      "key": "primary-blue"
    }
  },
  "componentSets": {
    // Component Sets (with variants)
    "component-set-id": {
      "id": "component-set-id",
      "name": "Button",
      "description": "Primary button component",
      "key": "button-component",
      "remote": false,
      "componentPropertyReferences": {
        "Variant": "variant-property-id",
        "Size": "size-property-id"
      }
    }
  },
  "components": {
    // Individual Components
    "component-id": {
      "id": "component-id",
      "name": "Button/Primary",
      "description": "Primary button variant",
      "key": "button-primary",
      "remote": false,
      "componentSetId": "component-set-id",
      "componentProperties": {
        "Variant": "Primary",
        "Size": "Medium"
      }
    }
  }
}
```

### **3. Component-Token Relationships**

```javascript
// Component with Token References
{
  "id": "button-component",
  "name": "Button/Primary",
  "type": "COMPONENT",
  "children": [
    {
      "id": "button-background",
      "type": "RECTANGLE",
      "fills": [{"type": "SOLID", "color": {"r": 0.2, "g": 0.4, "b": 0.8, "a": 1}}],
      "styles": {
        "fill": "primary-blue-style-id",  // References token
        "cornerRadius": "border-radius-8-style-id"  // References token
      }
    },
    {
      "id": "button-text",
      "type": "TEXT",
      "characters": "Button Text",
      "styles": {
        "fill": "text-white-style-id",  // References token
        "fontSize": "font-size-16-style-id",  // References token
        "fontFamily": "font-family-inter-style-id"  // References token
      }
    }
  ]
}
```

## 🚀 Enhanced App Architecture

### **1. Multi-File Support Structure**

```javascript
// Enhanced Configuration
{
  "figma": {
    "files": [
      {
        "id": "design-system-file-id",
        "name": "Design System",
        "type": "design-system",
        "description": "Global design tokens and components"
      },
      {
        "id": "app-screens-file-id", 
        "name": "App Screens",
        "type": "application",
        "description": "Application screens and pages"
      },
      {
        "id": "prototypes-file-id",
        "name": "Prototypes",
        "type": "prototype", 
        "description": "Interactive prototypes and flows"
      }
    ],
    "accessToken": "figma-access-token"
  }
}
```

### **2. Enhanced Data Models**

```typescript
// Enhanced Token Model
interface DesignToken {
  id: string;
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow' | 'effect';
  value: any;
  description?: string;
  category: string; // e.g., "colors/primary", "typography/headings"
  fileId: string; // Which file this token belongs to
  styleId?: string; // Figma style ID
  usage: string[]; // Component IDs that use this token
  variants?: Record<string, any>; // For responsive/theme variants
}

// Enhanced Component Model
interface FigmaComponent {
  id: string;
  name: string;
  type: 'COMPONENT' | 'COMPONENT_SET';
  description?: string;
  fileId: string; // Which file this component belongs to
  pageId: string; // Which page contains this component
  frameId: string; // Which frame contains this component
  
  // Token References
  usedTokens: {
    colors: string[]; // Token IDs
    typography: string[];
    spacing: string[];
    effects: string[];
  };
  
  // Component Properties
  properties: {
    [key: string]: {
      type: 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT';
      value: any;
      description?: string;
    };
  };
  
  // Variants (for component sets)
  variants?: FigmaComponent[];
  
  // Visual Properties
  absoluteBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  // Children with token references
  children: FigmaNode[];
  
  // Preview URLs
  preview: {
    image: string;
    html: string;
  };
}

// Enhanced Node Model with Token References
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  
  // Token References
  styleReferences: {
    fill?: string; // Token ID
    stroke?: string;
    text?: string;
    effect?: string;
    cornerRadius?: string;
  };
  
  // Visual Properties
  fills?: any[];
  strokes?: any[];
  effects?: any[];
  cornerRadius?: number;
  
  // Text Properties
  characters?: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    textAlignHorizontal?: string;
  };
  
  // Layout Properties
  absoluteBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  children?: FigmaNode[];
}
```

### **3. Enhanced HTML Generation with Token Integration**

```javascript
// Enhanced Component HTML Generator
class EnhancedComponentGenerator {
  constructor(tokens, components) {
    this.tokens = tokens;
    this.components = components;
  }
  
  generateComponentHtml(component) {
    // 1. Extract all tokens used by this component
    const usedTokens = this.extractComponentTokens(component);
    
    // 2. Generate CSS variables from used tokens
    const cssVariables = this.generateCssVariables(usedTokens);
    
    // 3. Generate HTML structure with token references
    const htmlStructure = this.generateHtmlStructure(component, usedTokens);
    
    // 4. Generate component-specific CSS
    const componentCss = this.generateComponentCss(component, usedTokens);
    
    // 5. Generate interactive behavior
    const javascript = this.generateComponentBehavior(component);
    
    return this.wrapInFullHtml(component, cssVariables, componentCss, htmlStructure, javascript);
  }
  
  extractComponentTokens(component) {
    const tokens = {
      colors: [],
      typography: [],
      spacing: [],
      effects: []
    };
    
    // Recursively traverse component tree
    this.traverseComponentForTokens(component, tokens);
    
    return tokens;
  }
  
  traverseComponentForTokens(node, tokens) {
    // Extract tokens from node styles
    if (node.styleReferences) {
      Object.entries(node.styleReferences).forEach(([property, tokenId]) => {
        const token = this.tokens.find(t => t.id === tokenId);
        if (token) {
          switch (token.type) {
            case 'color':
              tokens.colors.push(token);
              break;
            case 'typography':
              tokens.typography.push(token);
              break;
            case 'spacing':
              tokens.spacing.push(token);
              break;
            case 'effect':
              tokens.effects.push(token);
              break;
          }
        }
      });
    }
    
    // Traverse children
    if (node.children) {
      node.children.forEach(child => this.traverseComponentForTokens(child, tokens));
    }
  }
  
  generateCssVariables(tokens) {
    let css = ':root {\n';
    
    // Generate color variables
    tokens.colors.forEach(token => {
      css += `  --${token.category.replace('/', '-')}: ${token.value};\n`;
    });
    
    // Generate typography variables
    tokens.typography.forEach(token => {
      css += `  --font-${token.category.replace('/', '-')}: ${token.value.fontFamily};\n`;
      css += `  --font-size-${token.category.replace('/', '-')}: ${token.value.fontSize};\n`;
      css += `  --font-weight-${token.category.replace('/', '-')}: ${token.value.fontWeight};\n`;
    });
    
    // Generate spacing variables
    tokens.spacing.forEach(token => {
      css += `  --spacing-${token.category.replace('/', '-')}: ${token.value};\n`;
    });
    
    css += '}\n';
    return css;
  }
  
  generateComponentCss(component, tokens) {
    // Generate component-specific CSS using token variables
    let css = `.${this.sanitizeComponentName(component.name)} {\n`;
    
    // Apply component-level styles
    if (component.absoluteBoundingBox) {
      css += `  width: ${component.absoluteBoundingBox.width}px;\n`;
      css += `  height: ${component.absoluteBoundingBox.height}px;\n`;
    }
    
    // Apply token-based styles
    tokens.colors.forEach(token => {
      if (token.category.includes('background')) {
        css += `  background-color: var(--${token.category.replace('/', '-')});\n`;
      }
    });
    
    css += '}\n';
    return css;
  }
}
```

### **4. Multi-File Sync Strategy**

```javascript
// Enhanced Sync Manager
class MultiFileSyncManager {
  constructor(config) {
    this.files = config.figma.files;
    this.syncQueue = [];
    this.syncStatus = {};
  }
  
  async syncAllFiles() {
    console.log('🔄 Starting multi-file sync...');
    
    // 1. Sync design system file first (contains tokens)
    const designSystemFile = this.files.find(f => f.type === 'design-system');
    if (designSystemFile) {
      await this.syncDesignSystemFile(designSystemFile);
    }
    
    // 2. Sync other files with token references
    for (const file of this.files) {
      if (file.type !== 'design-system') {
        await this.syncApplicationFile(file);
      }
    }
    
    // 3. Generate cross-file relationships
    await this.generateCrossFileRelationships();
  }
  
  async syncDesignSystemFile(file) {
    console.log(`🎨 Syncing design system file: ${file.name}`);
    
    // Extract global styles (tokens)
    const tokens = await this.extractGlobalStyles(file.id);
    
    // Extract component library
    const components = await this.extractComponentLibrary(file.id);
    
    // Save with file reference
    await this.saveDesignSystemData(file.id, { tokens, components });
  }
  
  async syncApplicationFile(file) {
    console.log(`📱 Syncing application file: ${file.name}`);
    
    // Extract pages and components
    const pages = await this.extractPages(file.id);
    const components = await this.extractComponents(file.id);
    
    // Link components to design system tokens
    const linkedComponents = await this.linkComponentsToTokens(components);
    
    // Save with file reference
    await this.saveApplicationData(file.id, { pages, components: linkedComponents });
  }
  
  async linkComponentsToTokens(components) {
    // For each component, find which tokens it uses
    return components.map(component => ({
      ...component,
      usedTokens: this.findComponentTokenUsage(component)
    }));
  }
  
  findComponentTokenUsage(component) {
    const usedTokens = {
      colors: [],
      typography: [],
      spacing: [],
      effects: []
    };
    
    // Traverse component tree to find token references
    this.traverseForTokenUsage(component, usedTokens);
    
    return usedTokens;
  }
}
```

### **5. Enhanced UI/UX for Multi-File Support**

```typescript
// Enhanced Angular Service
@Injectable({
  providedIn: 'root'
})
export class EnhancedFigmaService {
  private files: FigmaFile[] = [];
  private tokens: DesignToken[] = [];
  private components: FigmaComponent[] = [];
  
  constructor(private http: HttpClient) {}
  
  // Get all available files
  getFiles(): Observable<FigmaFile[]> {
    return this.http.get<FigmaFile[]>('/api/mcp/figma/files');
  }
  
  // Get tokens from specific file
  getTokens(fileId: string): Observable<DesignToken[]> {
    return this.http.get<DesignToken[]>(`/api/mcp/figma/files/${fileId}/tokens`);
  }
  
  // Get components with token usage
  getComponents(fileId: string): Observable<FigmaComponent[]> {
    return this.http.get<FigmaComponent[]>(`/api/mcp/figma/files/${fileId}/components`);
  }
  
  // Get component with full token information
  getComponentWithTokens(componentId: string): Observable<FigmaComponent> {
    return this.http.get<FigmaComponent>(`/api/mcp/figma/components/${componentId}/with-tokens`);
  }
  
  // Generate HTML preview with token integration
  generateComponentHtmlPreview(componentId: string): Observable<string> {
    return this.http.get<string>(`/api/mcp/figma/components/${componentId}/html-preview`);
  }
}
```

## 🎯 Implementation Roadmap

### **Phase 1: Enhanced Token Extraction**
- [ ] Extract global styles from design system files
- [ ] Map component properties to token references
- [ ] Create token categorization system
- [ ] Build token usage tracking

### **Phase 2: Multi-File Support**
- [ ] Update configuration for multiple files
- [ ] Implement file-specific sync strategies
- [ ] Create cross-file relationship mapping
- [ ] Build file selection UI

### **Phase 3: Enhanced Component Generation**
- [ ] Implement token-aware HTML generation
- [ ] Create component-specific CSS generation
- [ ] Build interactive component previews
- [ ] Add component variant support

### **Phase 4: Advanced Features**
- [ ] Component dependency tracking
- [ ] Token impact analysis
- [ ] Design system documentation generation
- [ ] Angular component code generation

## 🔧 Key Benefits

1. **Accurate Token Usage**: Components will show exactly which tokens they use
2. **Multi-File Support**: Handle complex design systems across multiple files
3. **Better HTML Generation**: Components will render with proper token values
4. **Design System Insights**: Understand token usage and component relationships
5. **Scalable Architecture**: Support for large design systems and teams

This enhanced architecture will provide a much more robust and accurate representation of your Figma design system, with proper token integration and multi-file support. 