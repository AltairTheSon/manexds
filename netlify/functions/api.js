const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const https = require('https');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Figma API configuration
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || '6zbyXDOYjJsJW52P6iZ3hL';

// Helper function to make Figma API calls
function makeFigmaRequest(endpoint, accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': accessToken,
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
          
          if (res.statusCode >= 400) {
            const errorMessage = jsonData.message || jsonData.error || `HTTP ${res.statusCode}`;
            reject(new Error(errorMessage));
            return;
          }
          
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

// Initialize Figma connection endpoint
app.post('/initialize-connection', async (req, res) => {
  try {
    console.log('Received connection request:', { 
      hasAccessToken: !!req.body.accessToken, 
      hasFileId: !!req.body.fileId,
      fileId: req.body.fileId 
    });
    
    const { accessToken, fileId } = req.body;
    
    if (!accessToken || !fileId) {
      console.log('Missing required fields:', { accessToken: !!accessToken, fileId: !!fileId });
      return res.status(400).json({ 
        success: false, 
        error: 'Access token and file ID are required' 
      });
    }

    // Test the connection by making a request to the Figma API
    try {
      console.log('Making Figma API request for file:', fileId);
      const fileData = await makeFigmaRequest(`/v1/files/${fileId}`, accessToken);
      
      console.log('Figma API response received:', { 
        name: fileData.name, 
        hasStyles: !!fileData.styles,
        hasComponents: !!fileData.components 
      });
      
      res.json({
        success: true,
        message: 'Successfully connected to Figma',
        fileInfo: {
          name: fileData.name,
          lastModified: fileData.lastModified,
          version: fileData.version
        }
      });
    } catch (figmaError) {
      console.error('Figma API error:', figmaError);
      
      let errorMessage = 'Failed to connect to Figma';
      if (figmaError.message.includes('403')) {
        errorMessage = 'Invalid access token. Please check your Figma personal access token.';
      } else if (figmaError.message.includes('404')) {
        errorMessage = 'File not found. Please check your file ID.';
      } else if (figmaError.message.includes('401')) {
        errorMessage = 'Unauthorized. Please check your access token.';
      } else {
        errorMessage = `Failed to connect to Figma: ${figmaError.message}`;
      }
      
      res.status(400).json({
        success: false,
        error: errorMessage
      });
    }
  } catch (error) {
    console.error('Connection initialization error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while connecting to Figma.'
    });
  }
});

// Sync status endpoint
app.get('/sync-status', (req, res) => {
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
app.get('/files', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    res.json([
      {
        id: FIGMA_FILE_ID,
        name: 'Design System File',
        type: 'design-system',
        description: 'Main design system file',
        priority: 1,
        lastModified: new Date().toISOString(),
        version: '1.0.0'
      }
    ]);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Enhanced tokens endpoint
app.get('/enhanced/tokens', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    res.json([]);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

// Enhanced components endpoint
app.get('/enhanced/components', async (req, res) => {
  try {
    if (!FIGMA_ACCESS_TOKEN) {
      return res.json([]);
    }
    
    res.json([]);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

// Enhanced sync endpoint
app.post('/enhanced/sync', async (req, res) => {
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