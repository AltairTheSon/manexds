const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const https = require('https');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true, // Allow all origins in production
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Figma API configuration
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || '6zbyXDOYjJsJW52P6iZ3hL';

// Helper function to make Figma API calls
function makeFigmaRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    figmaConfigured: !!FIGMA_ACCESS_TOKEN
  });
});

// Sync status endpoint
app.get('/api/mcp/figma/sync-status', (req, res) => {
  res.json({
    isSyncing: false,
    syncProgress: 100,
    syncDetails: { 
      phase: 'Ready', 
      current: 1, 
      total: 1, 
      message: 'Serverless function ready' 
    },
    lastSyncTime: new Date().toISOString(),
    syncError: null,
    autoSyncEnabled: false,
    lastAutoSync: null,
    autoSyncInterval: 300000,
    developmentMode: false,
    canEnableAutoSync: false,
    apiUsage: { 
      callsThisHour: 0, 
      maxCallsPerHour: 800, 
      remainingCalls: 800, 
      lastReset: Date.now(),
      canMakeCalls: !!FIGMA_ACCESS_TOKEN 
    },
    cacheStatus: { 
      isValid: true, 
      lastValidation: new Date().toISOString(), 
      validDuration: 1800000 
    },
    dataCounts: { tokens: 0, components: 0, pages: 0 }
  });
});

// Files endpoint
app.get('/api/mcp/figma/files', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    const files = [
      {
        id: FIGMA_FILE_ID,
        name: 'Design System',
        type: 'design-system',
        description: 'Global design tokens and components',
        priority: 1,
        lastModified: new Date().toISOString(),
        version: '1.0.0'
      }
    ];
    
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Enhanced tokens endpoint
app.get('/api/mcp/figma/enhanced/tokens', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    const fileData = await makeFigmaRequest(`/v1/files/${FIGMA_FILE_ID}`);
    const tokens = [];
    
    // Extract tokens from styles
    if (fileData.styles) {
      Object.entries(fileData.styles).forEach(([styleId, style]) => {
        if (style.styleType === 'FILL') {
          tokens.push({
            id: styleId,
            name: style.name,
            type: 'color',
            value: '#000000', // Placeholder - would need to extract actual color
            description: `Color style: ${style.name}`,
            category: 'colors/primary',
            fileId: FIGMA_FILE_ID,
            styleId: styleId,
            usage: [],
            lastModified: new Date().toISOString()
          });
        }
      });
    }
    
    res.json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

// Enhanced components endpoint
app.get('/api/mcp/figma/enhanced/components', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    const fileData = await makeFigmaRequest(`/v1/files/${FIGMA_FILE_ID}`);
    const components = [];
    
    // Extract components
    if (fileData.components) {
      Object.entries(fileData.components).forEach(([componentId, component]) => {
        components.push({
          id: componentId,
          name: component.name,
          type: 'COMPONENT',
          description: component.description || '',
          fileId: FIGMA_FILE_ID,
          pageId: component.pageId || '',
          frameId: component.frameId || '',
          usedTokens: {
            colors: [],
            typography: [],
            spacing: [],
            effects: []
          },
          properties: {},
          absoluteBoundingBox: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
          },
          children: [],
          preview: {
            image: '',
            html: ''
          },
          lastModified: new Date().toISOString()
        });
      });
    }
    
    res.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

// Sync endpoint
app.post('/api/mcp/figma/enhanced/sync', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.status(400).json({ 
        success: false, 
        error: 'Figma access token not configured' 
      });
    }
    
    res.json({
      success: true,
      message: 'Sync completed successfully',
      syncId: Date.now().toString(),
      syncType: 'full'
    });
  } catch (error) {
    console.error('Error during sync:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Sync failed' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Export the serverless function
module.exports.handler = serverless(app);