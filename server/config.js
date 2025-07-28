// Load environment variables
require('dotenv').config();

module.exports = {
  figma: {
    fileId: process.env.FIGMA_FILE_ID || '6zbyXDOYjJsJW52P6iZ3hL',
    // Add your Figma access token via environment variable
    accessToken: process.env.FIGMA_ACCESS_TOKEN
  },
  server: {
    port: process.env.PORT || 3200
  }
}; 