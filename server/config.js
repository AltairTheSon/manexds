// Load environment variables
require('dotenv').config();

module.exports = {
  figma: {
    // Single file support (backward compatibility)
    fileId: process.env.FIGMA_FILE_ID || '6zbyXDOYjJsJW52P6iZ3hL',
    accessToken: process.env.FIGMA_ACCESS_TOKEN,
    
    // Enhanced multi-file support
    files: [
      {
        id: '6zbyXDOYjJsJW52P6iZ3hL',
        name: 'Design System',
        type: 'design-system',
        description: 'Global design tokens and components',
        priority: 1 // Sync first (contains tokens)
      }
      // Note: Second file needs a valid file ID
      // To add a second file, you need to:
      // 1. Get the file ID from Figma (right-click on file → Copy link → extract ID)
      // 2. Add it to the files array below
      // Example:
      // {
      //   id: 'YOUR_SECOND_FILE_ID_HERE',
      //   name: 'Second Design File',
      //   type: 'application',
      //   description: 'Second design file with components and screens',
      //   priority: 2
      // }
    ],
    
    // Enhanced token extraction settings
    tokenExtraction: {
      enabled: true,
      extractGlobalStyles: true,
      extractLocalStyles: true,
      categorizeTokens: true,
      trackTokenUsage: true,
      generateCssVariables: true
    },
    
    // Enhanced component extraction settings
    componentExtraction: {
      enabled: true,
      extractVariants: true,
      extractProperties: true,
      linkToTokens: true,
      generateHtmlPreviews: true
    }
  },
  server: {
    port: process.env.PORT || 3200
  },
  // Auto-sync configuration
  autoSync: {
    // Set to false to disable auto-sync during development
    enabled: process.env.AUTO_SYNC_ENABLED === 'true' || false,
    // Check interval in milliseconds (default: 5 minutes)
    interval: parseInt(process.env.AUTO_SYNC_INTERVAL) || 300000,
    // Minimum safe interval (2 minutes)
    minInterval: 120000,
    // Cache validity duration in milliseconds (default: 30 minutes)
    cacheValidDuration: parseInt(process.env.AUTO_SYNC_CACHE_DURATION) || 1800000,
    // API rate limiting
    maxApiCallsPerHour: parseInt(process.env.MAX_API_CALLS_PER_HOUR) || 800
  },
  // Development mode settings
  development: {
    // Disable auto-sync in development by default
    disableAutoSync: process.env.NODE_ENV === 'development' && process.env.DEV_DISABLE_AUTO_SYNC !== 'false',
    // Show detailed logs in development
    verboseLogging: process.env.NODE_ENV === 'development' || false
  }
}; 