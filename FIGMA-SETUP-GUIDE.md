# 🔗 Figma Connection Setup Guide

## Overview

This guide shows you how to connect your Angular design system to Figma and automatically pull design tokens, components, and pages.

## 🔑 Step 1: Get Your Figma Access Token

### Method A: Personal Access Token (Recommended)

1. **Go to Figma Settings:**
   - Open Figma in your browser
   - Click your profile icon in the top-right
   - Select "Settings"

2. **Navigate to Account Settings:**
   - Click "Account" in the left sidebar
   - Scroll down to "Personal access tokens"

3. **Create a New Token:**
   - Click "Create new token"
   - Give it a name (e.g., "Design System Sync")
   - Copy the generated token (you won't see it again!)

4. **Set Environment Variable:**
   ```bash
   # Windows (PowerShell)
   $env:FIGMA_TOKEN="your-token-here"
   
   # Windows (Command Prompt)
   set FIGMA_TOKEN=your-token-here
   
   # macOS/Linux
   export FIGMA_TOKEN="your-token-here"
   ```

### Method B: Team Access Token

If you're working with a team file:

1. **Go to Team Settings:**
   - Open your team in Figma
   - Click "Settings" in the top-right
   - Select "Team settings"

2. **Create Team Token:**
   - Navigate to "Access tokens"
   - Create a new team token
   - Set appropriate permissions

## 📁 Step 2: Get Your Figma File ID

### Find Your File ID

1. **Open your Figma design file**
2. **Look at the URL:**
   ```
   https://www.figma.com/file/ABC123DEF456/My-Design-System
   ```
   The file ID is: `ABC123DEF456`

3. **Set Environment Variable:**
   ```bash
   # Windows (PowerShell)
   $env:FIGMA_FILE_ID="ABC123DEF456"
   
   # Windows (Command Prompt)
   set FIGMA_FILE_ID=ABC123DEF456
   
   # macOS/Linux
   export FIGMA_FILE_ID="ABC123DEF456"
   ```

## ⚙️ Step 3: Configure Your Figma File

### Organize Your Figma File

For best results, organize your Figma file like this:

```
📁 Design System
├── 🎨 Design Tokens
│   ├── Colors
│   │   ├── Primary/50, 100, 200, 300, 400, 500, 600, 700, 800, 900
│   │   ├── Secondary/50, 100, 200, 300, 400, 500, 600, 700, 800, 900
│   │   └── Gray/50, 100, 200, 300, 400, 500, 600, 700, 800, 900
│   ├── Typography
│   │   ├── Heading 1, Heading 2, Heading 3, Heading 4
│   │   ├── Body, Body Small, Caption
│   │   └── Button, Input
│   └── Spacing
│       ├── 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px
│       └── Auto Layout spacing
├── 🧩 Components
│   ├── Button
│   │   ├── Primary, Secondary, Outline, Ghost, Danger
│   │   └── Small, Medium, Large
│   ├── Input
│   │   ├── Default, Error, Success, Disabled
│   │   └── Small, Medium, Large
│   ├── Card
│   │   ├── Default, Elevated, Outlined
│   │   └── Small, Medium, Large
│   └── Badge
│       ├── Default, Success, Warning, Error
│       └── Small, Medium, Large
└── 📄 Pages
    ├── Home, Dashboard, Profile, Settings
    └── Component Showcase
```

### Naming Conventions

Use consistent naming in Figma:

- **Colors**: `Primary/500`, `Gray/900`, `Success/500`
- **Typography**: `Heading 1`, `Body`, `Button Text`
- **Components**: `Button/Primary`, `Input/Default`, `Card/Elevated`
- **Spacing**: `Spacing/4px`, `Spacing/16px`

## 🚀 Step 4: Run the Figma Sync

### Option A: Using the Sync Script

```bash
# Run the full sync
node scripts/figma-sync.js --token=YOUR_TOKEN --file=YOUR_FILE_ID
```

### Option B: Using Environment Variables

```bash
# Set environment variables
export FIGMA_TOKEN="your-token-here"
export FIGMA_FILE_ID="your-file-id-here"

# Run sync
node scripts/figma-sync.js
```

### Option C: Using the Configuration File

1. **Update `figma.config.js`:**
   ```javascript
   module.exports = {
     figma: {
       accessToken: 'your-token-here',
       fileId: 'your-file-id-here'
     }
   }
   ```

2. **Run sync:**
   ```bash
   node scripts/figma-sync.js
   ```

## 📊 Step 5: What Gets Generated

### Design Tokens
- **Colors**: CSS custom properties for all colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Padding, margins, gaps
- **Shadows**: Box shadows and effects
- **Border Radius**: Corner radius values

### Components
- **TypeScript**: Angular component classes with inputs/outputs
- **HTML**: Component templates
- **SCSS**: Component styles with variants
- **Tests**: Unit test files

### Data Files
- **components.json**: Component metadata from Figma
- **pages.json**: Page information
- **tokens.json**: All design tokens

## 🔧 Step 6: Customize the Output

### Update Configuration

Edit `figma.config.js` to customize:

```javascript
module.exports = {
  // Component naming
  naming: {
    components: {
      button: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      input: ['default', 'error', 'success', 'disabled']
    }
  },
  
  // Output formats
  formats: {
    css: {
      useCustomProperties: true,
      minify: false
    }
  },
  
  // Validation
  validation: {
    checkColorContrast: true,
    accessibilityWarnings: true
  }
}
```

### Custom Mapping

Map Figma names to your preferred names:

```javascript
mapping: {
  components: {
    'Button/Primary': 'Button',
    'Input/Default': 'Input'
  },
  colors: {
    'Primary/500': 'primary-500',
    'Gray/900': 'gray-900'
  }
}
```

## 🔄 Step 7: Set Up Continuous Sync

### Option A: Manual Sync

```bash
# Run sync manually when needed
npm run figma:sync
```

### Option B: Watch Mode

```bash
# Watch for changes and auto-sync
npm run figma:watch
```

### Option C: GitHub Actions

Create `.github/workflows/figma-sync.yml`:

```yaml
name: Figma Sync
on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM
  workflow_dispatch:  # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run figma:sync
        env:
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}
          FIGMA_FILE_ID: ${{ secrets.FIGMA_FILE_ID }}
      - run: git config user.name "Figma Bot"
      - run: git config user.email "figma@example.com"
      - run: git add .
      - run: git commit -m "Sync design system from Figma" || exit 0
      - run: git push
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid token" error:**
   - Check your token is correct
   - Ensure token has proper permissions
   - Try regenerating the token

2. **"File not found" error:**
   - Verify file ID is correct
   - Check file permissions
   - Ensure file is accessible

3. **"Rate limit exceeded" error:**
   - Wait a few minutes and try again
   - Reduce sync frequency
   - Check API rate limits

4. **"No components found" error:**
   - Ensure components are properly named
   - Check component organization
   - Verify file structure

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=figma:*

# Run sync with debug info
node scripts/figma-sync.js
```

## 📚 API Reference

### Figma API Endpoints Used

- `GET /v1/files/:file_key` - Get file data
- `GET /v1/files/:file_key/nodes` - Get specific nodes
- `GET /v1/images/:file_key` - Get images

### Rate Limits

- **Personal tokens**: 60 requests per minute
- **Team tokens**: Varies by plan
- **File access**: Based on file permissions

## 🔒 Security Best Practices

1. **Never commit tokens to git:**
   ```bash
   # Add to .gitignore
   echo "*.env" >> .gitignore
   echo "figma.config.local.js" >> .gitignore
   ```

2. **Use environment variables:**
   ```bash
   # Create .env file
   FIGMA_TOKEN=your-token-here
   FIGMA_FILE_ID=your-file-id-here
   ```

3. **Rotate tokens regularly:**
   - Update tokens every 90 days
   - Use different tokens for different environments

## 🎯 Next Steps

1. **Test the connection** with a simple sync
2. **Organize your Figma file** for optimal extraction
3. **Customize the configuration** for your needs
4. **Set up continuous sync** for automation
5. **Document your design system** with generated components

---

**Need help?** Check the troubleshooting section or create an issue in the repository. 