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

// Helper function to make Figma API calls
function makeFigmaRequest(endpoint, accessToken) {
  return new Promise((resolve, reject) => {
    console.log('Making Figma request to:', endpoint);
    
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
      console.log('Figma API response status:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Figma API response data length:', data.length);
        
        try {
          const jsonData = JSON.parse(data);
          
          if (res.statusCode >= 400) {
            console.log('Figma API error response:', jsonData);
            const errorMessage = jsonData.message || jsonData.error || `HTTP ${res.statusCode}`;
            reject(new Error(errorMessage));
            return;
          }
          
          console.log('Figma API success response keys:', Object.keys(jsonData));
          resolve(jsonData);
        } catch (error) {
          console.log('JSON parse error:', error);
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      console.log('Request error:', error);
      reject(error);
    });

    req.end();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'API function is working'
  });
});

// Initialize Figma connection endpoint
app.post('/initialize-connection', async (req, res) => {
  console.log('=== CONNECTION REQUEST START ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { accessToken, fileId } = req.body;
    
    if (!accessToken || !fileId) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Access token and file ID are required' 
      });
    }

    console.log('Testing connection with file ID:', fileId);
    
    // Test the connection by making a request to the Figma API
    try {
      const fileData = await makeFigmaRequest(`/v1/files/${fileId}`, accessToken);
      
      console.log('Connection successful! File name:', fileData.name);
      
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
      console.log('Figma API error:', figmaError.message);
      
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
      
      console.log('Returning error:', errorMessage);
      res.status(400).json({
        success: false,
        error: errorMessage
      });
    }
  } catch (error) {
    console.log('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while connecting to Figma.'
    });
  }
  
  console.log('=== CONNECTION REQUEST END ===');
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
      canMakeCalls: true
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
  res.json([
    {
      id: '6zbyXDOYjJsJW52P6iZ3hL',
      name: 'Design System File',
      type: 'design-system',
      description: 'Main design system file',
      priority: 1,
      lastModified: new Date().toISOString(),
      version: '1.0.0'
    }
  ]);
});

// Enhanced tokens endpoint
app.get('/enhanced/tokens', async (req, res) => {
  res.json([]);
});

// Enhanced components endpoint
app.get('/enhanced/components', async (req, res) => {
  res.json([]);
});

// Enhanced sync endpoint
app.post('/enhanced/sync', async (req, res) => {
  res.json({
    success: true,
    message: 'Sync completed successfully',
    syncId: Date.now().toString(),
    syncType: 'full'
  });
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