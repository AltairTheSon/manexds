# 🎨 MCP Figma Integration Setup Guide

This guide will help you set up the **MCP (Model Context Protocol) Figma integration** for your Angular design system. This allows your Angular app to automatically sync with your Figma designs in real-time.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Angular app dependencies
npm install

# Install MCP server dependencies
npm run server:install
```

### 2. Start Both Servers

```bash
# Start Angular app + MCP server simultaneously
npm run dev
```

This will start:
- **Angular app** on `http://localhost:4200`
- **MCP Figma server** on `http://localhost:3001`

### 3. Connect to Figma

1. Open `http://localhost:4200` in your browser
2. Enter your Figma credentials:
   - **Access Token**: Get from [Figma Settings](https://www.figma.com/developers/api#access-tokens)
   - **File ID**: Found in your Figma URL: `figma.com/file/[FILE_ID]/...`
   - **Team ID**: Optional, for team files
3. Click "Connect to Figma"

## 🔧 Detailed Setup

### Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 17+
- Figma account with API access

### Step 1: Get Figma Access Token

1. Go to [Figma Settings](https://www.figma.com/developers/api#access-tokens)
2. Click "Generate new access token"
3. Give it a name (e.g., "Angular Design System")
4. Copy the token (you won't see it again!)

### Step 2: Find Your File ID

1. Open your Figma file
2. Look at the URL: `https://www.figma.com/file/ABC123DEF456/My-Design-System`
3. The file ID is `ABC123DEF456`

### Step 3: Configure the Integration

The MCP server automatically handles:
- ✅ Design token extraction
- ✅ Component discovery
- ✅ Page structure analysis
- ✅ Real-time file watching
- ✅ CSS variable generation

## 🎯 How It Works

### Architecture

```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Angular App   │ ◄──────────────────► │  MCP Figma      │
│  (localhost:4200)│                     │  Server         │
│                 │                     │ (localhost:3001) │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                       ┌─────────────────┐
                                       │   Figma API     │
                                       │  (api.figma.com) │
                                       └─────────────────┘
```

### Data Flow

1. **Connection**: Angular app connects to MCP server
2. **Authentication**: MCP server authenticates with Figma API
3. **Extraction**: MCP server extracts design tokens, components, pages
4. **Sync**: Data flows back to Angular app
5. **Updates**: Real-time watching for Figma file changes

## 🔄 Real-Time Features

### Automatic Syncing

- **Design Tokens**: Colors, typography, spacing, shadows
- **Components**: All Figma components with variants
- **Pages**: Page structure and hierarchy
- **File Changes**: Automatic detection and sync

### Manual Controls

- **Sync All**: Pull all data from Figma
- **Sync Tokens**: Update only design tokens
- **Sync Components**: Update only components
- **Watch Changes**: Enable real-time file monitoring

## 🎨 Design Token Extraction

The MCP server automatically extracts:

### Colors
```css
:root {
  --ds-primary-600: #3b82f6;
  --ds-secondary-600: #8b5cf6;
  --ds-success-600: #10b981;
  --ds-error-600: #ef4444;
}
```

### Typography
```css
:root {
  --ds-heading-1: 2.25rem;
  --ds-heading-2: 1.875rem;
  --ds-body: 1rem;
  --ds-caption: 0.875rem;
}
```

### Spacing
```css
:root {
  --ds-spacing-xs: 0.25rem;
  --ds-spacing-sm: 0.5rem;
  --ds-spacing-md: 1rem;
  --ds-spacing-lg: 1.5rem;
}
```

## 🧩 Component Generation

### From Figma Components

The system can generate Angular components from your Figma components:

1. **Extract Properties**: Size, colors, typography, spacing
2. **Generate Variants**: Primary, secondary, outline, etc.
3. **Create Files**: TypeScript, HTML, SCSS
4. **Auto-Import**: Add to design system module

### Example Generated Component

```typescript
// Generated from Figma component "Button/Primary"
@Component({
  selector: 'ds-button-primary',
  template: `<button class="btn btn-primary">{{ text }}</button>`,
  styles: [`
    .btn-primary {
      background: var(--ds-primary-600);
      color: white;
      padding: var(--ds-spacing-md);
    }
  `]
})
export class ButtonPrimaryComponent {
  @Input() text = 'Button';
}
```

## 🔧 Configuration

### MCP Server Configuration

Edit `server/mcp-figma-server.js` to customize:

```javascript
// Sync interval (default: 30 seconds)
this.watchInterval = setInterval(async () => {
  // Check for changes
}, 30000);

// File watching
this.startWatching(); // Checks every 30 seconds
```

### Angular App Configuration

Edit `src/app/services/figma-mcp.service.ts`:

```typescript
// MCP server endpoint
private readonly MCP_ENDPOINT = '/api/mcp/figma';

// Auto-sync interval
startAutoSync(intervalMs: number = 30000): void {
  // Sync every 30 seconds
}
```

## 🚨 Troubleshooting

### Common Issues

#### 1. "Failed to connect to Figma"
- ✅ Check your access token is correct
- ✅ Verify file ID is valid
- ✅ Ensure file is accessible to your account

#### 2. "MCP server not responding"
- ✅ Check server is running: `npm run server:dev`
- ✅ Verify port 3001 is available
- ✅ Check server logs for errors

#### 3. "No data synced"
- ✅ Ensure Figma file has components/tokens
- ✅ Check file permissions
- ✅ Verify API rate limits

#### 4. "Angular compilation errors"
- ✅ Run `npm install` to ensure dependencies
- ✅ Check TypeScript configuration
- ✅ Verify component imports

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=figma-mcp:*

# Start servers with debug
npm run dev
```

### Health Check

Check server status:

```bash
# Check MCP server health
curl http://localhost:3001/api/mcp/figma/health

# Expected response:
{
  "status": "healthy",
  "connected": true,
  "fileId": "your-file-id"
}
```

## 🔒 Security Considerations

### Access Token Security

- ✅ Store tokens securely (not in code)
- ✅ Use environment variables
- ✅ Rotate tokens regularly
- ✅ Limit token permissions

### API Rate Limits

- ✅ Figma API: 2000 requests/hour
- ✅ MCP server: Configurable intervals
- ✅ Angular app: Smart caching

### CORS Configuration

The MCP server includes CORS for development:

```javascript
// server/mcp-figma-server.js
this.app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

## 📚 API Reference

### MCP Server Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/mcp/figma/initialize` | POST | Initialize Figma connection |
| `/api/mcp/figma/tokens` | GET | Get design tokens |
| `/api/mcp/figma/components` | GET | Get components |
| `/api/mcp/figma/pages` | GET | Get pages |
| `/api/mcp/figma/generate-component` | POST | Generate Angular component |
| `/api/mcp/figma/generate-css` | POST | Generate CSS variables |
| `/api/mcp/figma/watch` | GET | Start file watching |
| `/api/mcp/figma/health` | GET | Health check |

### Angular Service Methods

| Method | Description |
|--------|-------------|
| `initializeFigmaConnection()` | Connect to Figma |
| `syncDesignTokens()` | Sync design tokens |
| `syncComponents()` | Sync components |
| `syncPages()` | Sync pages |
| `startAutoSync()` | Enable automatic syncing |
| `watchFigmaChanges()` | Watch for file changes |
| `generateAngularComponent()` | Generate component |
| `updateCssVariables()` | Update CSS variables |

## 🎯 Next Steps

### Production Deployment

1. **Environment Variables**: Set up proper token storage
2. **HTTPS**: Secure MCP server communication
3. **Monitoring**: Add logging and error tracking
4. **CI/CD**: Automate deployment process

### Advanced Features

1. **WebSocket**: Real-time updates without polling
2. **Caching**: Smart caching for performance
3. **Versioning**: Track design system versions
4. **Analytics**: Track component usage

### Integration Examples

- **Storybook**: Auto-generate stories from Figma
- **Testing**: Visual regression testing
- **Documentation**: Auto-generate component docs
- **Theming**: Dynamic theme switching

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs for errors
3. Verify Figma API status
4. Check network connectivity

For additional help, refer to:
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Angular Documentation](https://angular.io/docs)
- [MCP Protocol](https://modelcontextprotocol.io/)

---

**🎉 You're now ready to build a design system that automatically stays in sync with your Figma designs!** 