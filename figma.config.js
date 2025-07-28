/**
 * Figma Configuration
 * Configure your Figma API connection and design system settings
 */

module.exports = {
  // Figma API Configuration
  figma: {
    // Your Figma access token (get from: https://www.figma.com/developers/api#access-tokens)
    accessToken: process.env.FIGMA_TOKEN || 'your-figma-token-here',
    
    // Your Figma file ID (get from the URL: https://www.figma.com/file/FILE_ID/...)
    fileId: process.env.FIGMA_FILE_ID || 'your-file-id-here',
    
    // Team ID (optional, for team files)
    teamId: process.env.FIGMA_TEAM_ID || null,
    
    // API rate limiting (requests per minute)
    rateLimit: 60
  },

  // Design System Configuration
  designSystem: {
    // Output directory for generated files
    outputDir: './src/design-system',
    
    // Component prefix (e.g., 'ds-' for <ds-button>)
    componentPrefix: 'ds',
    
    // CSS custom property prefix
    cssPrefix: 'ds',
    
    // File structure
    structure: {
      components: 'components',
      tokens: 'styles',
      data: 'data',
      assets: 'assets'
    }
  },

  // Token Extraction Settings
  tokens: {
    // Extract colors from fills
    extractColors: true,
    
    // Extract typography from text nodes
    extractTypography: true,
    
    // Extract spacing from layout properties
    extractSpacing: true,
    
    // Extract shadows from effects
    extractShadows: true,
    
    // Extract border radius
    extractBorderRadius: true,
    
    // Color naming strategy: 'semantic' | 'hex' | 'figma'
    colorNaming: 'semantic',
    
    // Typography naming strategy: 'semantic' | 'figma'
    typographyNaming: 'semantic'
  },

  // Component Generation Settings
  components: {
    // Generate TypeScript interfaces
    generateTypes: true,
    
    // Generate unit tests
    generateTests: true,
    
    // Generate documentation
    generateDocs: true,
    
    // Component naming strategy: 'pascal' | 'kebab' | 'figma'
    namingStrategy: 'pascal',
    
    // Include component variants
    includeVariants: true,
    
    // Include component states (hover, focus, etc.)
    includeStates: true
  },

  // File Generation Settings
  files: {
    // Generate CSS variables
    generateCSS: true,
    
    // Generate SCSS variables
    generateSCSS: true,
    
    // Generate TypeScript types
    generateTypes: true,
    
    // Generate JSON data
    generateJSON: true,
    
    // Generate documentation
    generateDocs: true
  },

  // Naming Conventions
  naming: {
    // Component naming patterns
    components: {
      // Button variants: primary, secondary, outline
      button: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      
      // Input variants: default, error, success
      input: ['default', 'error', 'success', 'disabled'],
      
      // Card variants: default, elevated, outlined
      card: ['default', 'elevated', 'outlined'],
      
      // Badge variants: default, success, warning, error
      badge: ['default', 'success', 'warning', 'error']
    },
    
    // Size variants
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    
    // Color scales
    colorScales: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  },

  // Mapping Configuration
  mapping: {
    // Map Figma component names to Angular component names
    components: {
      'Button/Primary': 'Button',
      'Button/Secondary': 'Button',
      'Input/Default': 'Input',
      'Card/Default': 'Card'
    },
    
    // Map Figma color names to semantic names
    colors: {
      'Primary/500': 'primary-500',
      'Secondary/500': 'secondary-500',
      'Gray/900': 'gray-900',
      'Gray/100': 'gray-100'
    },
    
    // Map Figma typography to semantic names
    typography: {
      'Heading 1': 'heading-1',
      'Heading 2': 'heading-2',
      'Body': 'body',
      'Caption': 'caption'
    }
  },

  // Output Formats
  formats: {
    // CSS output format
    css: {
      // Use CSS custom properties
      useCustomProperties: true,
      
      // Include fallbacks for older browsers
      includeFallbacks: false,
      
      // Minify output
      minify: false
    },
    
    // SCSS output format
    scss: {
      // Use SCSS variables
      useVariables: true,
      
      // Include mixins
      includeMixins: true,
      
      // Include functions
      includeFunctions: true
    },
    
    // TypeScript output format
    typescript: {
      // Generate interfaces
      generateInterfaces: true,
      
      // Generate enums
      generateEnums: true,
      
      // Generate constants
      generateConstants: true
    }
  },

  // Validation Settings
  validation: {
    // Validate color contrast ratios
    checkColorContrast: true,
    
    // Validate typography scales
    checkTypographyScale: true,
    
    // Validate spacing consistency
    checkSpacingConsistency: true,
    
    // Generate accessibility warnings
    accessibilityWarnings: true
  },

  // Automation Settings
  automation: {
    // Auto-sync on file changes
    autoSync: false,
    
    // Watch for Figma file changes
    watchFigma: false,
    
    // Generate changelog
    generateChangelog: true,
    
    // Commit changes to git
    autoCommit: false,
    
    // Create pull requests
    createPullRequests: false
  }
}; 