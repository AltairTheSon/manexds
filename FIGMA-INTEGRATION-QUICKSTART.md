# 🎨 Figma Integration Quick Start

## Step 1: Extract Design Tokens from Figma

### Option A: Using Figma Dev Mode (Easiest)
1. Open your Figma design file
2. Click the "Dev Mode" toggle in the top toolbar
3. Select components to inspect their properties
4. Copy the values and update `src/styles.scss`

### Option B: Using the Token Extractor Script
```bash
# Run the token extraction script
node scripts/extract-figma-tokens.js
```

## Step 2: Update Design Tokens

Replace the values in `src/styles.scss` with your Figma colors, typography, and spacing:

```scss
:root {
  /* Replace with your Figma colors */
  --ds-primary-500: #your-figma-primary-color;
  --ds-gray-900: #your-figma-text-color;
  
  /* Replace with your Figma typography */
  --ds-font-family-sans: 'Your-Figma-Font', sans-serif;
  --ds-font-size-base: 16px; /* Your Figma base size */
}
```

## Step 3: Generate Components from Figma

### For each component in your Figma design:

```bash
# Generate a button component with variants
node scripts/generate-component.js --name Button --variant primary,secondary,outline --size sm,md,lg

# Generate a card component
node scripts/generate-component.js --name Card --variant default,elevated --size sm,md,lg

# Generate an input component
node scripts/generate-component.js --name Input --variant default,error,success --size sm,md,lg
```

## Step 4: Apply Figma Styles to Components

### Example: Button Component from Figma

1. **Inspect your Figma button:**
   - Select the button component
   - Note the padding, border-radius, colors, typography

2. **Update the generated component styles:**
```scss
.ds-button {
  // Use exact values from Figma
  padding: 12px 24px; // From Figma padding
  border-radius: 8px; // From Figma corner radius
  font-family: 'Inter', sans-serif; // From Figma typography
  font-size: 14px; // From Figma text size
  font-weight: 500; // From Figma font weight
  
  &--primary {
    background-color: #3B82F6; // From Figma fill color
    color: #FFFFFF; // From Figma text color
  }
}
```

## Step 5: Test Your Components

```bash
# Start the development server
npm start

# Open http://localhost:4200 to see your components
```

## Step 6: Use Components in Your App

```html
<!-- Use your Figma-based components -->
<ds-button variant="primary" size="md">
  Click me
</ds-button>

<ds-card padding="md" elevation="md">
  <div ds-card-header>
    <h3>Card Title</h3>
  </div>
  <div ds-card-body>
    <p>Card content</p>
  </div>
</ds-card>
```

## 🔧 Advanced Integration

### Figma API Integration
For automated token extraction:

1. Get your Figma access token
2. Install the Figma API: `npm install figma-api`
3. Update the token extractor script with your file ID
4. Run automated extraction

### Design System Sync
Set up continuous integration to keep Figma and code in sync:

1. Use GitHub Actions to run token extraction
2. Set up webhooks to trigger updates when Figma changes
3. Automate component generation from Figma components

## 📚 Resources

- [Figma Dev Mode Documentation](https://help.figma.com/hc/en-us/articles/360025508774-Use-Dev-mode)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Design Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978/Design-Tokens)

## 🎯 Best Practices

1. **Consistent Naming**: Use the same names in Figma and code
2. **Token Organization**: Group related tokens together
3. **Version Control**: Keep design and code changes documented
4. **Testing**: Test components across different states and sizes
5. **Documentation**: Document component usage and variants

## 🚀 Next Steps

1. Extract your first component from Figma
2. Update the design tokens with your brand colors
3. Generate components for your most common UI elements
4. Set up automated token extraction
5. Create a component library documentation site

---

**Need help?** Check the detailed guide in `docs/figma-integration.md` 