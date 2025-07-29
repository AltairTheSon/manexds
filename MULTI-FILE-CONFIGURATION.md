# 🎯 Multi-File Figma Configuration

## ✅ **Updated Configuration**

Your enhanced Figma integration now supports **multiple files** with the following configuration:

### **Configured Files**

#### **1. Design System File**
- **ID**: `6zbyXDOYjJsJW52P6iZ3hL`
- **Name**: Design System
- **Type**: `design-system`
- **Priority**: 1 (Syncs first - contains tokens)
- **Description**: Global design tokens and components

#### **2. Additional Design File**
- **ID**: `jvhAvDIp7YxKbLjxXwOsHO`
- **Name**: Additional Design File
- **Type**: `application`
- **Priority**: 2 (Syncs second)
- **Description**: Additional design file with components and screens

## 🔧 **Configuration Details**

### **Server Configuration** (`server/config.js`)
```javascript
{
  figma: {
    files: [
      {
        id: '6zbyXDOYjJsJW52P6iZ3hL',
        name: 'Design System',
        type: 'design-system',
        description: 'Global design tokens and components',
        priority: 1
      },
      {
        id: 'jvhAvDIp7YxKbLjxXwOsHO',
        name: 'Additional Design File',
        type: 'application',
        description: 'Additional design file with components and screens',
        priority: 2
      }
    ]
  }
}
```

## 🚀 **How Multi-File Sync Works**

### **Priority-Based Syncing**
1. **Design System File** (Priority 1) - Syncs first
   - Extracts global design tokens
   - Establishes token foundation
   - Provides base design system

2. **Additional Design File** (Priority 2) - Syncs second
   - Uses tokens from design system
   - Links components to existing tokens
   - Maintains file boundaries

### **Enhanced Features**
- ✅ **Token Sharing**: Tokens from design system are available to all files
- ✅ **File Isolation**: Components maintain their file associations
- ✅ **Cross-File Relationships**: Components can use tokens from other files
- ✅ **Organized Data**: Clear separation between design system and application files

## 🎨 **Enhanced UI Features**

### **File Selection**
- Browse tokens and components by specific Figma file
- Filter data by file type (design-system vs application)
- View cross-file token usage

### **Token Management**
- Tokens from design system are globally available
- Local tokens are file-specific
- Clear categorization by file and type

### **Component Organization**
- Components are organized by their source file
- Token usage shows cross-file relationships
- File-specific filtering and search

## 📊 **Data Structure**

### **Enhanced Token with File Association**
```typescript
interface EnhancedDesignToken {
  id: string;
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow' | 'effect';
  value: any;
  category: string;
  fileId: string; // Which file this token belongs to
  usage: string[]; // Component IDs that use this token (can be from any file)
  lastModified: string;
}
```

### **Enhanced Component with File Association**
```typescript
interface EnhancedFigmaComponent {
  id: string;
  name: string;
  type: 'COMPONENT' | 'COMPONENT_SET';
  fileId: string; // Which file this component belongs to
  pageId: string;
  frameId: string;
  
  // Token References (can reference tokens from any file)
  usedTokens: {
    colors: string[]; // Token IDs
    typography: string[];
    spacing: string[];
    effects: string[];
  };
  
  lastModified: string;
}
```

## 🧪 **Testing Multi-File Configuration**

### **1. Test Configuration**
```bash
node test-multi-file-config.js
```

### **2. Test Enhanced Sync**
Open `test-enhanced-html.html` and click:
- **"Start Enhanced Sync"** - Syncs both files
- **"Test Multi-File Sync"** - Tests specific file sync
- **"Test All Endpoints"** - Tests all endpoints with multi-file support

### **3. API Endpoints**
- `GET /api/mcp/figma/enhanced/tokens` - Get tokens from all files
- `GET /api/mcp/figma/enhanced/components` - Get components from all files
- `POST /api/mcp/figma/enhanced/sync` - Sync both files

## 🎯 **Benefits of Multi-File Support**

### **1. Organized Design System**
- Separate design system from application files
- Clear token hierarchy and organization
- Maintainable file structure

### **2. Scalable Architecture**
- Add more files as needed
- Priority-based syncing ensures proper dependencies
- File-specific configurations

### **3. Enhanced Workflow**
- Design system tokens available to all files
- Component-specific files for different features
- Clear separation of concerns

### **4. Better Token Management**
- Global tokens from design system
- Local tokens for file-specific needs
- Cross-file token usage tracking

## 🚀 **Next Steps**

1. **Start the Enhanced Server**
   ```bash
   cd server
   node mcp-figma-server.js
   ```

2. **Test Multi-File Sync**
   - Open `test-enhanced-html.html`
   - Click "Test Multi-File Sync"
   - Verify both files are synced

3. **Use Enhanced UI**
   - Start Angular app: `ng serve --port 4200`
   - Navigate to Enhanced Design System
   - Filter by file to see organized data

4. **Customize File Names**
   - Update file names in `server/config.js` to match your actual file names
   - Adjust file types and priorities as needed

## 🎉 **Success Metrics**

✅ **Multi-File Support**: Both Figma files configured and accessible
✅ **Priority-Based Syncing**: Design system syncs first, application files second
✅ **Token Sharing**: Tokens available across all files
✅ **File Organization**: Clear separation and organization
✅ **Enhanced UI**: File-specific filtering and navigation
✅ **Cross-File Relationships**: Components can use tokens from any file

Your enhanced Figma integration now supports a complete multi-file design system workflow! 🎨✨ 