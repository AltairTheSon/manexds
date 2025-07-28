# Figma Integration Guide

## Method 1: Figma Dev Mode (Recommended)

### Step 1: Enable Dev Mode
1. Open your Figma design file
2. Click the "Dev Mode" toggle in the top toolbar
3. Select any component or frame to inspect

### Step 2: Extract Design Tokens
1. **Colors**: Click on any color to see the hex value
2. **Typography**: Select text to see font family, size, weight, line height
3. **Spacing**: Use the spacing tool to measure gaps
4. **Shadows**: Inspect effects to get shadow values

### Step 3: Update CSS Variables
Replace the values in `src/styles.scss` with your Figma tokens:

```scss
:root {
  /* Replace with your Figma colors */
  --ds-primary-50: #your-figma-color;
  --ds-primary-500: #your-figma-color;
  --ds-primary-900: #your-figma-color;
  
  /* Replace with your Figma typography */
  --ds-font-family-sans: 'Your-Figma-Font', sans-serif;
  --ds-font-size-base: 16px; /* Your Figma base size */
}
```

## Method 2: Figma Tokens Plugin

### Step 1: Install Figma Tokens Plugin
1. Go to Figma Community
2. Search for "Figma Tokens"
3. Install the plugin

### Step 2: Export Tokens
1. Run the Figma Tokens plugin
2. Export tokens as JSON
3. Use the exported values in your CSS

## Method 3: Manual Component Extraction

### Step 1: Component Analysis
1. Select a component in Figma
2. Note the following properties:
   - Dimensions (width, height)
   - Colors (fill, stroke)
   - Typography (font, size, weight)
   - Spacing (padding, margins)
   - Effects (shadows, borders)

### Step 2: Create Angular Component
```typescript
// Example: Button from Figma
@Component({
  selector: 'ds-button',
  template: `<button class="ds-button ds-button--{{variant}}">
    <ng-content></ng-content>
  </button>`
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
```

### Step 3: Apply Figma Styles
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

## Method 4: Automated Figma API Integration

### Step 1: Get Figma Access Token
1. Go to Figma Settings > Account > Personal access tokens
2. Create a new token

### Step 2: Install Figma API
```bash
npm install figma-api
```

### Step 3: Create Token Extractor
```typescript
// scripts/extract-figma-tokens.ts
import { Figma } from 'figma-api';

const figma = new Figma({
  personalAccessToken: 'your-token'
});

async function extractTokens(fileId: string) {
  const file = await figma.getFile(fileId);
  
  // Extract colors, typography, spacing from file
  const tokens = {
    colors: extractColors(file),
    typography: extractTypography(file),
    spacing: extractSpacing(file)
  };
  
  return tokens;
}
```

## Method 5: Design System Sync Workflow

### Step 1: Organize Figma File
1. Create a "Design Tokens" page
2. Organize components by type
3. Use consistent naming conventions

### Step 2: Create Sync Script
```typescript
// scripts/sync-figma.ts
import { writeFileSync } from 'fs';

async function syncFigmaToCode() {
  // 1. Extract tokens from Figma
  const tokens = await extractFigmaTokens();
  
  // 2. Generate CSS variables
  const cssVariables = generateCSSVariables(tokens);
  
  // 3. Update styles.scss
  writeFileSync('src/styles.scss', cssVariables);
  
  // 4. Generate component templates
  const components = await extractComponents();
  generateAngularComponents(components);
}
```

## Best Practices

### 1. Naming Conventions
- Use consistent naming between Figma and code
- Example: `Primary/500` in Figma → `--ds-primary-500` in CSS

### 2. Token Organization
- Group tokens by type (colors, typography, spacing)
- Use semantic names (primary, secondary, success, error)

### 3. Version Control
- Keep Figma file and code in sync
- Document changes in both places
- Use semantic versioning for design system updates

### 4. Component Structure
- Match Figma component hierarchy in Angular
- Use the same prop names as Figma variants
- Maintain consistent spacing and sizing

## Tools and Resources

### Figma Plugins
- **Figma Tokens**: Export design tokens
- **Design Tokens**: Sync tokens between tools
- **CSS Export**: Generate CSS from Figma styles

### Development Tools
- **Figma Dev Mode**: Inspect design properties
- **Figma API**: Programmatic access to designs
- **Style Dictionary**: Transform tokens to multiple formats

### Automation
- **GitHub Actions**: Auto-sync Figma changes
- **Webhooks**: Trigger updates when Figma changes
- **CI/CD**: Deploy design system updates automatically 