# 🎨 Figma Setup Guide

## Quick Setup

Your Figma file ID has been automatically configured: `6zbyXDOYjJsJW52P6iZ3hL`

### Step 1: Get Your Figma Access Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll down to "Personal access tokens"
3. Click "Create new token"
4. Give it a name (e.g., "Design System Integration")
5. Copy the generated token

### Step 2: Connect to Figma

#### Option A: Through the Angular App (Recommended)
1. Open `http://localhost:4200`
2. The file ID is already pre-filled
3. Paste your access token in the "Access Token" field
4. Click "Connect to Figma"
5. The system will automatically sync your design data

#### Option B: Auto-Connection (Advanced)
1. Edit `server/config.js`
2. Uncomment the `accessToken` line
3. Add your token: `accessToken: 'your-token-here'`
4. Restart the server
5. The connection will be automatic

### Step 3: Verify Connection

After connecting, you should see:
- ✅ Design tokens loaded
- ✅ Components loaded  
- ✅ Pages loaded
- ✅ Preview generation working

## File Structure

```
DesignPrototype/
├── src/environments/
│   ├── environment.ts          # Angular environment (file ID configured)
│   └── environment.prod.ts     # Production environment
├── server/
│   ├── config.js               # Server configuration (file ID configured)
│   └── mcp-figma-server.js     # MCP server
└── FIGMA-SETUP.md              # This file
```

## Troubleshooting

### Connection Issues
- Ensure your access token is valid
- Check that the file ID is correct
- Verify the MCP server is running on port 3200
- Check browser console for error messages

### Preview Issues
- Components may take a moment to generate previews
- Check the "Preview Test" section in the Angular app
- Ensure both Angular (4200) and MCP (3200) servers are running

### Data Not Loading
- Try clicking "Force Full Sync" in the Angular app
- Check the MCP server logs for errors
- Verify you have access to the Figma file

## Next Steps

Once connected:
1. Explore your design tokens in the "Tokens" tab
2. View your components in the "Components" tab
3. Generate Angular components from your Figma designs
4. Use the preview functionality to see visual representations

## Security Note

- Never commit your access token to version control
- Use environment variables in production
- The token is stored locally in your browser for convenience 