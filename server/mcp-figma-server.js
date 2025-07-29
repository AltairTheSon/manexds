const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Enhanced services
const EnhancedTokenExtractor = require('./services/enhanced-token-extractor');
const EnhancedComponentExtractor = require('./services/enhanced-component-extractor');

/**
 * MCP Figma Server
 * Handles Figma API calls and provides endpoints for Angular app
 */

class McpFigmaServer {
  constructor() {
    this.app = express();
    this.port = config.server.port;
    this.figmaToken = config.figma.accessToken || null;
    this.fileId = config.figma.fileId;
    this.teamId = null;
    this.watchInterval = null;
    this.lastFileVersion = null;
    
    // Enhanced services
    this.tokenExtractor = new EnhancedTokenExtractor(config);
    this.componentExtractor = new EnhancedComponentExtractor(config, this.tokenExtractor);
    
    // Sync state tracking
    this.isSyncing = false;
    this.syncProgress = 0;
    this.syncError = null;
    this.lastSyncTime = null;
    
    // Auto-sync state tracking
    this.autoSyncEnabled = config.autoSync.enabled;
    this.autoSyncInterval = config.autoSync.interval;
    this.lastAutoSync = null;
    this.autoSyncError = null;
    
    // Rate limiting tracking
    this.apiCallsThisHour = 0;
    this.lastApiReset = Date.now();
    this.maxApiCallsPerHour = config.autoSync.maxApiCallsPerHour;
    
    // Cache validation
    this.cacheValidDuration = config.autoSync.cacheValidDuration;
    this.lastCacheValidation = null;
    
    // Local storage paths
    this.storageDir = path.join(__dirname, 'storage');
    this.cacheFile = path.join(this.storageDir, 'figma-cache.json');
    this.metadataFile = path.join(this.storageDir, 'sync-metadata.json');
    this.htmlPreviewCacheFile = path.join(this.storageDir, 'html-preview-cache.json');
    this.enhancedCacheFile = path.join(this.storageDir, 'enhanced-figma-cache.json');
    
    // Load persistent API call tracking (after storageDir is set)
    this.loadApiCallTracking();
    
    // Ensure storage directory exists
    this.ensureStorageDirectory();
    
    // Load cached data on startup
    this.loadCachedData();
    this.loadHtmlPreviewCache();
    this.loadEnhancedCachedData();

    this.setupMiddleware();
    this.setupRoutes();
  }

  ensureStorageDirectory() {
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
      console.log('📁 Created storage directory:', this.storageDir);
    }
  }

  loadCachedData() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const cachedData = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
        this.cachedTokens = cachedData.tokens || [];
        this.cachedComponents = cachedData.components || [];
        this.cachedPages = cachedData.pages || [];
        console.log('📦 Loaded cached data:', {
          tokens: this.cachedTokens.length,
          components: this.cachedComponents.length,
          pages: this.cachedPages.length
        });
      } else {
        this.cachedTokens = [];
        this.cachedComponents = [];
        this.cachedPages = [];
      }

      if (fs.existsSync(this.metadataFile)) {
        const metadata = JSON.parse(fs.readFileSync(this.metadataFile, 'utf8'));
        this.lastSyncTime = metadata.lastSync;
        this.lastFileVersion = metadata.fileVersion;
        console.log('📊 Loaded sync metadata:', metadata);
      }
    } catch (error) {
      console.error('❌ Error loading cached data:', error);
      this.cachedTokens = [];
      this.cachedComponents = [];
      this.cachedPages = [];
    }
  }

  loadEnhancedCachedData() {
    try {
      if (fs.existsSync(this.enhancedCacheFile)) {
        const enhancedData = JSON.parse(fs.readFileSync(this.enhancedCacheFile, 'utf8'));
        
        // Load enhanced tokens
        if (enhancedData.tokens) {
          this.enhancedTokens = enhancedData.tokens;
          console.log('🎨 Loaded enhanced tokens:', this.enhancedTokens.length);
        }
        
        // Load enhanced components
        if (enhancedData.components) {
          this.enhancedComponents = enhancedData.components;
          console.log('🧩 Loaded enhanced components:', this.enhancedComponents.length);
        }
        
        // Load files data
        if (enhancedData.files) {
          this.enhancedFiles = enhancedData.files;
          console.log('📁 Loaded enhanced files:', this.enhancedFiles.length);
        }
        
        console.log('📦 Loaded enhanced cached data');
      } else {
        this.enhancedTokens = [];
        this.enhancedComponents = [];
        this.enhancedFiles = [];
        console.log('📦 No enhanced cache found, starting fresh');
      }
    } catch (error) {
      console.error('❌ Error loading enhanced cached data:', error);
      this.enhancedTokens = [];
      this.enhancedComponents = [];
      this.enhancedFiles = [];
    }
  }

  loadHtmlPreviewCache() {
    try {
      if (fs.existsSync(this.htmlPreviewCacheFile)) {
        const cacheData = JSON.parse(fs.readFileSync(this.htmlPreviewCacheFile, 'utf8'));
        this.htmlPreviewCache = new Map(Object.entries(cacheData));
        console.log('🌐 Loaded HTML preview cache:', this.htmlPreviewCache.size, 'items');
      } else {
        this.htmlPreviewCache = new Map();
        console.log('🌐 Initialized empty HTML preview cache');
      }
    } catch (error) {
      console.error('❌ Error loading HTML preview cache:', error);
      this.htmlPreviewCache = new Map();
    }
  }

  saveHtmlPreviewCache() {
    try {
      const cacheData = Object.fromEntries(this.htmlPreviewCache);
      fs.writeFileSync(this.htmlPreviewCacheFile, JSON.stringify(cacheData, null, 2));
      console.log('💾 Saved HTML preview cache:', this.htmlPreviewCache.size, 'items');
    } catch (error) {
      console.error('❌ Error saving HTML preview cache:', error);
    }
  }

  clearComponentHtmlPreviewCache(componentId) {
    // Remove cached HTML preview for a specific component
    const keysToRemove = [];
    for (const [key, value] of this.htmlPreviewCache.entries()) {
      if (key.startsWith(componentId + '_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      this.htmlPreviewCache.delete(key);
    });
    
    if (keysToRemove.length > 0) {
      console.log(`🗑️ Cleared HTML preview cache for component: ${componentId}`);
      this.saveHtmlPreviewCache();
    }
  }

  saveCachedData() {
    try {
      const cacheData = {
        tokens: this.cachedTokens,
        components: this.cachedComponents,
        pages: this.cachedPages,
        lastUpdated: new Date().toISOString()
      };
      
      fs.writeFileSync(this.cacheFile, JSON.stringify(cacheData, null, 2));
      
      const metadata = {
        lastSync: new Date().toISOString(),
        fileVersion: this.lastFileVersion,
        fileId: this.fileId,
        tokensCount: this.cachedTokens.length,
        componentsCount: this.cachedComponents.length,
        pagesCount: this.cachedPages.length
      };
      
      fs.writeFileSync(this.metadataFile, JSON.stringify(metadata, null, 2));
      console.log('💾 Saved cached data to disk');
    } catch (error) {
      console.error('❌ Error saving cached data:', error);
    }
  }

  saveEnhancedCachedData() {
    try {
      const enhancedDataToSave = {
        tokens: this.enhancedTokens || [],
        components: this.enhancedComponents || [],
        files: this.enhancedFiles || [],
        lastUpdated: new Date().toISOString()
      };
      
      fs.writeFileSync(this.enhancedCacheFile, JSON.stringify(enhancedDataToSave, null, 2));
      console.log('💾 Saved enhanced cached data to file');
    } catch (error) {
      console.error('❌ Error saving enhanced cached data:', error);
    }
  }

  setupMiddleware() {
    this.app.use(cors({
      origin: '*', // Allow all origins for testing
      credentials: false, // Disable credentials for wildcard origin
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  setupRoutes() {
    // Initialize Figma connection
    this.app.post('/api/mcp/figma/initialize', (req, res) => {
      const { figmaToken, fileId, teamId } = req.body;
      
      this.figmaToken = figmaToken;
      this.fileId = fileId;
      this.teamId = teamId;

      console.log('✅ Figma connection initialized');
      res.json({ success: true, message: 'Figma connection initialized' });
    });

    // Start server-side sync
    this.app.post('/api/mcp/figma/sync', async (req, res) => {
      try {
        const { syncType = 'full' } = req.body;
        
        console.log(`🔄 Starting server-side sync: ${syncType}`);
        
        // Start sync in background
        this.startServerSideSync(syncType);
        
        res.json({ 
          success: true, 
          message: 'Sync started on server',
          syncId: Date.now().toString(),
          syncType 
        });
      } catch (error) {
        console.error('Error starting sync:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Enhanced sync endpoint
    this.app.post('/api/mcp/figma/enhanced/sync', async (req, res) => {
      try {
        const { syncType = 'full' } = req.body;
        
        console.log(`🔄 Starting enhanced sync: ${syncType}`);
        
        // Start enhanced sync in background
        this.startEnhancedSync(syncType);
        
        res.json({ 
          success: true, 
          message: 'Enhanced sync started on server',
          syncId: Date.now().toString(),
          syncType 
        });
      } catch (error) {
        console.error('Error starting enhanced sync:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Delta sync endpoint
    this.app.post('/api/mcp/figma/delta-sync', async (req, res) => {
      try {
        console.log('🔄 Starting delta sync...');
        
        // Start delta sync in background
        this.startServerSideSync('delta');
        
        res.json({ 
          success: true, 
          message: 'Delta sync started on server',
          syncId: Date.now().toString(),
          syncType: 'delta'
        });
      } catch (error) {
        console.error('Error starting delta sync:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get sync status
    this.app.get('/api/mcp/figma/sync-status', (req, res) => {
      res.json({
        isSyncing: this.isSyncing,
        syncProgress: this.syncProgress,
        syncDetails: this.syncDetails || {
          phase: 'Idle',
          current: 0,
          total: 0,
          message: 'Ready'
        },
        lastSyncTime: this.lastSyncTime,
        syncError: this.syncError,
        autoSyncEnabled: this.autoSyncEnabled,
        lastAutoSync: this.lastAutoSync,
        autoSyncInterval: this.autoSyncInterval,
        developmentMode: config.development.disableAutoSync,
        canEnableAutoSync: !config.development.disableAutoSync,
        apiUsage: {
          callsThisHour: this.apiCallsThisHour,
          maxCallsPerHour: this.maxApiCallsPerHour,
          remainingCalls: Math.max(0, this.maxApiCallsPerHour - this.apiCallsThisHour),
          lastReset: this.lastApiReset,
          canMakeCalls: this.canMakeApiCall()
        },
        cacheStatus: {
          isValid: !this.isCacheExpired(),
          lastValidation: this.lastCacheValidation,
          validDuration: this.cacheValidDuration
        },
        dataCounts: {
          tokens: this.cachedTokens.length,
          components: this.cachedComponents.length,
          pages: this.cachedPages.length
        }
      });
    });

    // Get paginated data (for large datasets)
    this.app.get('/api/mcp/figma/tokens', async (req, res) => {
      try {
        const { page = 1, limit = 100, search } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        
        let tokens = this.cachedTokens;
        
        // Apply search filter if provided
        if (search) {
          tokens = tokens.filter(token => 
            token.name.toLowerCase().includes(search.toLowerCase()) ||
            token.type.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        const paginatedTokens = tokens.slice(startIndex, endIndex);
        
        res.json({
          data: paginatedTokens,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: tokens.length,
            totalPages: Math.ceil(tokens.length / limit)
          }
        });
      } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get paginated components
    this.app.get('/api/mcp/figma/components', async (req, res) => {
      try {
        const { page = 1, limit = 100, search } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        
        let components = this.cachedComponents;
        
        // Apply search filter if provided
        if (search) {
          components = components.filter(component => 
            component.name.toLowerCase().includes(search.toLowerCase()) ||
            component.type.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        const paginatedComponents = components.slice(startIndex, endIndex);
        
        res.json({
          data: paginatedComponents,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: components.length,
            totalPages: Math.ceil(components.length / limit)
          }
        });
      } catch (error) {
        console.error('Error getting components:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get paginated pages
    this.app.get('/api/mcp/figma/pages', async (req, res) => {
      try {
        const { page = 1, limit = 100, search } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        
        let pages = this.cachedPages;
        
        // Apply search filter if provided
        if (search) {
          pages = pages.filter(page => 
            page.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        const paginatedPages = pages.slice(startIndex, endIndex);
        
        res.json({
          data: paginatedPages,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: pages.length,
            totalPages: Math.ceil(pages.length / limit)
          }
        });
      } catch (error) {
        console.error('Error getting pages:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get specific item by ID
    this.app.get('/api/mcp/figma/token/:id', (req, res) => {
      try {
        const token = this.cachedTokens.find(t => t.id === req.params.id);
        if (!token) {
          return res.status(404).json({ error: 'Token not found' });
        }
        res.json(token);
      } catch (error) {
        console.error('Error getting token:', error);
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/mcp/figma/component/:id', (req, res) => {
      try {
        const component = this.cachedComponents.find(c => c.id === req.params.id);
        if (!component) {
          return res.status(404).json({ error: 'Component not found' });
        }
        res.json(component);
      } catch (error) {
        console.error('Error getting component:', error);
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/mcp/figma/page/:id', (req, res) => {
      try {
        const page = this.cachedPages.find(p => p.id === req.params.id);
        if (!page) {
          return res.status(404).json({ error: 'Page not found' });
        }
        res.json(page);
      } catch (error) {
        console.error('Error getting page:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get design tokens (always return cached data if available)
    this.app.get('/api/mcp/figma/tokens', async (req, res) => {
      try {
        // Always return cached data if available
        if (this.cachedTokens.length > 0) {
          console.log('📦 Returning cached tokens:', this.cachedTokens.length);
          return res.json(this.cachedTokens);
        }
        
        // Only extract from Figma if no cached data and Figma connection is available
        if (this.figmaToken) {
          console.log('🔄 No cached tokens found, extracting from Figma...');
          const tokens = await this.extractDesignTokens();
          this.cachedTokens = tokens;
          this.saveCachedData();
          res.json(tokens);
        } else {
          res.json([]);
        }
      } catch (error) {
        console.error('Error getting design tokens:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get components (always return cached data if available)
    this.app.get('/api/mcp/figma/components', async (req, res) => {
      try {
        // Always return cached data if available
        if (this.cachedComponents.length > 0) {
          console.log('📦 Returning cached components:', this.cachedComponents.length);
          return res.json(this.cachedComponents);
        }
        
        // Only extract from Figma if no cached data and Figma connection is available
        if (this.figmaToken) {
          console.log('🔄 No cached components found, extracting from Figma...');
          const components = await this.extractComponents();
          this.cachedComponents = components;
          this.saveCachedData();
          res.json(components);
        } else {
          res.json([]);
        }
      } catch (error) {
        console.error('Error getting components:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Enhanced API endpoints
    // Get enhanced design tokens
    this.app.get('/api/mcp/figma/enhanced/tokens', (req, res) => {
      res.json(this.enhancedTokens || []);
    });

    // Get enhanced tokens by type
    this.app.get('/api/mcp/figma/enhanced/tokens/:type', (req, res) => {
      const { type } = req.params;
      const tokens = this.enhancedTokens || [];
      const filteredTokens = tokens.filter(token => token.type === type);
      res.json(filteredTokens);
    });

    // Get enhanced tokens by category
    this.app.get('/api/mcp/figma/enhanced/tokens/category/:category', (req, res) => {
      const { category } = req.params;
      const tokens = this.enhancedTokens || [];
      const filteredTokens = tokens.filter(token => token.category === category);
      res.json(filteredTokens);
    });

    // Get enhanced components
    this.app.get('/api/mcp/figma/enhanced/components', (req, res) => {
      res.json(this.enhancedComponents || []);
    });

    // Get enhanced component with token usage
    this.app.get('/api/mcp/figma/enhanced/components/:componentId', (req, res) => {
      const { componentId } = req.params;
      const component = (this.enhancedComponents || []).find(c => c.id === componentId);
      
      if (component) {
        res.json(component);
      } else {
        res.status(404).json({ error: 'Component not found' });
      }
    });

    // Get components using a specific token
    this.app.get('/api/mcp/figma/enhanced/tokens/:tokenId/components', (req, res) => {
      const { tokenId } = req.params;
      const components = this.enhancedComponents || [];
      const usingComponents = components.filter(component => {
        const allTokens = component.getUsedTokenIds ? component.getUsedTokenIds() : [];
        return allTokens.includes(tokenId);
      });
      res.json(usingComponents);
    });

    // Get enhanced Figma files
    this.app.get('/api/mcp/figma/files', (req, res) => {
      res.json(this.enhancedFiles || []);
    });

    // Get pages (always return cached data if available)
    this.app.get('/api/mcp/figma/pages', async (req, res) => {
      try {
        // Always return cached data if available
        if (this.cachedPages.length > 0) {
          console.log('📦 Returning cached pages:', this.cachedPages.length);
          return res.json(this.cachedPages);
        }
        
        // Only extract from Figma if no cached data and Figma connection is available
        if (this.figmaToken) {
          console.log('🔄 No cached pages found, extracting from Figma...');
          const pages = await this.extractPages();
          this.cachedPages = pages;
          this.saveCachedData();
          res.json(pages);
        } else {
          res.json([]);
        }
      } catch (error) {
        console.error('Error getting pages:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get page flow data for interactive viewer - returns only containers
    this.app.get('/api/mcp/figma/page-flows', async (req, res) => {
      try {
        if (this.cachedPages.length > 0) {
          console.log('📦 Returning container data:', this.cachedPages.length);
          
          const containers = [];
          
          // Process each page as a container
          for (const page of this.cachedPages) {
            console.log(`Processing container: ${page.name} (${page.type})`);
            
            // Extract individual pages from this container
            const individualPages = this.extractIndividualPagesFromContainer(page);
            
            // Add the container with its individual pages count
            containers.push({
              id: page.id,
              name: page.name,
              type: page.type,
              preview: page.preview,
              isContainer: true,
              individualPagesCount: individualPages.length,
              lastModified: page.lastModified || new Date().toISOString()
            });
          }
          
          console.log(`📁 Total containers: ${containers.length}`);
          return res.json(containers);
        }
        
        res.json([]);
      } catch (error) {
        console.error('Error getting page flows:', error);
        res.status(500).json({ error: error.message });
      }
    });
    
    // Get individual pages for a specific container
    this.app.get('/api/mcp/figma/container/:containerId/pages', async (req, res) => {
      try {
        const containerId = req.params.containerId;
        
        if (!this.cachedPages || this.cachedPages.length === 0) {
          return res.json([]);
        }
        
        const container = this.cachedPages.find(page => page.id === containerId);
        if (!container) {
          return res.status(404).json({ error: 'Container not found' });
        }
        
        const individualPages = this.extractIndividualPagesFromContainer(container);
        console.log(`📄 Found ${individualPages.length} individual pages in container "${container.name}"`);
        
        return res.json(individualPages);
      } catch (error) {
        console.error('Error getting container pages:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // HTML Preview endpoint
    this.app.get('/api/mcp/figma/html-preview/:pageId', async (req, res) => {
      try {
        const { pageId } = req.params;
        console.log(`🌐 Generating HTML preview for page: ${pageId}`);
        
        // Find the page in all containers
        let targetPage = null;
        for (const container of this.cachedPages) {
          const individualPages = this.extractIndividualPagesFromContainer(container);
          const foundPage = individualPages.find(page => page.id === pageId);
          if (foundPage) {
            targetPage = foundPage;
            break;
          }
        }
        
        if (!targetPage) {
          return res.status(404).json({ error: 'Page not found' });
        }
        
        // Generate HTML preview
        const htmlPreview = this.generateHtmlPreview(targetPage);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlPreview);
      } catch (error) {
        console.error('❌ Error generating HTML preview:', error);
        res.status(500).json({ error: 'Failed to generate HTML preview' });
      }
    });

    // HTML Preview export endpoint
    this.app.get('/api/mcp/figma/html-preview/:pageId/export', async (req, res) => {
      try {
        const { pageId } = req.params;
        console.log(`📥 Exporting HTML preview for page: ${pageId}`);
        
        // Find the page in all containers
        let targetPage = null;
        for (const container of this.cachedPages) {
          const individualPages = this.extractIndividualPagesFromContainer(container);
          const foundPage = individualPages.find(page => page.id === pageId);
          if (foundPage) {
            targetPage = foundPage;
            break;
          }
        }
        
        if (!targetPage) {
          return res.status(404).json({ error: 'Page not found' });
        }
        
        // Generate HTML preview
        const htmlPreview = this.generateHtmlPreview(targetPage);
        
        // Set headers for download
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename="${targetPage.name}-preview.html"`);
        res.send(htmlPreview);
      } catch (error) {
        console.error('❌ Error exporting HTML preview:', error);
        res.status(500).json({ error: 'Failed to export HTML preview' });
      }
    });

    // Component HTML Preview endpoint
    this.app.get('/api/mcp/figma/component-html-preview/:componentId', async (req, res) => {
      try {
        const { componentId } = req.params;
        // Decode the component ID to handle URL encoding
        const decodedComponentId = decodeURIComponent(componentId);
        console.log(`🌐 Generating HTML preview for component: ${decodedComponentId}`);
        
        // Find the component in cached data
        const component = this.cachedComponents.find(comp => comp.id === decodedComponentId);
        if (!component) {
          console.log(`❌ Component not found: ${decodedComponentId}`);
          console.log(`📋 Total cached components: ${this.cachedComponents.length}`);
          console.log(`📋 Available component IDs:`, this.cachedComponents.slice(0, 5).map(c => ({ id: c.id, name: c.name })));
          return res.status(404).json({ error: 'Component not found' });
        }
        
        // Generate HTML preview using design tokens
        const htmlPreview = this.generateComponentHtmlPreview(component);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlPreview);
      } catch (error) {
        console.error('❌ Error generating component HTML preview:', error);
        res.status(500).json({ error: 'Failed to generate component HTML preview' });
      }
    });

    // Component HTML Preview export endpoint
    this.app.get('/api/mcp/figma/component-html-preview/:componentId/export', async (req, res) => {
      try {
        const { componentId } = req.params;
        // Decode the component ID to handle URL encoding
        const decodedComponentId = decodeURIComponent(componentId);
        console.log(`📥 Exporting component HTML preview for: ${decodedComponentId}`);
        
        // Find the component in cached data
        const component = this.cachedComponents.find(comp => comp.id === decodedComponentId);
        if (!component) {
          console.log(`❌ Component not found: ${decodedComponentId}`);
          return res.status(404).json({ error: 'Component not found' });
        }
        
        // Generate HTML preview using design tokens
        const htmlPreview = this.generateComponentHtmlPreview(component);
        
        // Set headers for download
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename="${component.name}-component.html"`);
        res.send(htmlPreview);
      } catch (error) {
        console.error('❌ Error exporting component HTML preview:', error);
        res.status(500).json({ error: 'Failed to export component HTML preview' });
      }
    });

    // Clear component HTML preview cache endpoint
    this.app.delete('/api/mcp/figma/component-html-preview/:componentId/cache', async (req, res) => {
      try {
        console.log('🗑️ DELETE request received for component cache clearing');
        const { componentId } = req.params;
        // Decode the component ID to handle URL encoding
        const decodedComponentId = decodeURIComponent(componentId);
        console.log(`🗑️ Clearing HTML preview cache for component: ${decodedComponentId}`);
        
        // Clear the cache for this component
        this.clearComponentHtmlPreviewCache(decodedComponentId);
        
        res.json({ success: true, message: 'Cache cleared successfully' });
      } catch (error) {
        console.error('❌ Error clearing component HTML preview cache:', error);
        res.status(500).json({ error: 'Failed to clear cache' });
      }
    });

    // Clear all component HTML preview caches endpoint
    this.app.delete('/api/mcp/figma/component-html-preview/cache/all', async (req, res) => {
      try {
        console.log(`🗑️ DELETE request received for clearing all component caches`);
        
        // Clear all component caches
        this.htmlPreviewCache.clear();
        this.saveHtmlPreviewCache();
        
        res.json({ success: true, message: 'All component caches cleared successfully' });
      } catch (error) {
        console.error('❌ Error clearing all component HTML preview caches:', error);
        res.status(500).json({ error: 'Failed to clear all caches' });
      }
    });

    // Test endpoint to verify DELETE requests work
    this.app.delete('/api/mcp/figma/test-delete', async (req, res) => {
      console.log('🧪 Test DELETE endpoint hit');
      res.json({ success: true, message: 'DELETE endpoint working' });
    });

    // Debug endpoint to list available components
    this.app.get('/api/mcp/figma/debug/components', async (req, res) => {
      try {
        console.log(`🔍 Debug: Listing ${this.cachedComponents.length} components`);
        const componentList = this.cachedComponents.slice(0, 10).map(comp => ({
          id: comp.id,
          name: comp.name,
          type: comp.type
        }));
        res.json({
          total: this.cachedComponents.length,
          components: componentList
        });
      } catch (error) {
        console.error('❌ Error listing components:', error);
        res.status(500).json({ error: 'Failed to list components' });
      }
    });

    // Generate Angular component
    this.app.post('/api/mcp/figma/generate-component', async (req, res) => {
      try {
        const { componentId, framework, outputPath } = req.body;
        const component = await this.generateAngularComponent(componentId, outputPath);
        res.json(component);
      } catch (error) {
        console.error('Error generating component:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Generate Angular page
    this.app.post('/api/mcp/figma/generate-page', async (req, res) => {
      try {
        const { pageId } = req.body;
        
        if (!pageId) {
          return res.status(400).json({ 
            success: false, 
            message: 'Page ID is required' 
          });
        }

        const result = await this.generateAngularPage(pageId);
        res.json({ success: true, data: result });
      } catch (error) {
        console.error('Error generating page:', error);
        res.status(500).json({ 
          success: false, 
          message: error.message 
        });
      }
    });

    // Generate CSS variables
    this.app.post('/api/mcp/figma/generate-css', async (req, res) => {
      try {
        const { tokens } = req.body;
        const css = this.generateCssVariables(tokens);
        res.json({ css });
      } catch (error) {
        console.error('Error generating CSS:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Watch for Figma changes
    this.app.get('/api/mcp/figma/watch', (req, res) => {
      this.startWatching();
      res.json({ success: true, message: 'Watching for Figma changes' });
    });

    // Stop watching
    this.app.post('/api/mcp/figma/stop-watch', (req, res) => {
      this.stopWatching();
      res.json({ success: true, message: 'Stopped watching Figma changes' });
    });

    // Health check
    this.app.get('/api/mcp/figma/health', (req, res) => {
      res.json({ 
        status: 'healthy', 
        connected: !!this.figmaToken,
        fileId: this.fileId 
      });
    });

    // Delta sync endpoint
    this.app.get('/api/mcp/figma/delta-sync', async (req, res) => {
      try {
        if (!this.figmaToken || !this.fileId) {
          return res.json({
            hasChanges: false,
            newTokens: [],
            updatedTokens: [],
            newComponents: [],
            updatedComponents: [],
            newPages: [],
            updatedPages: []
          });
        }

        // For now, return no changes (this would be implemented with proper delta detection)
        res.json({
          hasChanges: false,
          newTokens: [],
          updatedTokens: [],
          newComponents: [],
          updatedComponents: [],
          newPages: [],
          updatedPages: []
        });
      } catch (error) {
        console.error('Error in delta sync:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Full sync endpoint
    this.app.get('/api/mcp/figma/full-sync', async (req, res) => {
      try {
        console.log('🔄 Full sync requested');
        console.log('Figma token:', this.figmaToken ? 'Present' : 'Not configured');
        console.log('File ID:', this.fileId);

        // If no Figma connection, return error
        if (!this.figmaToken || !this.fileId) {
          console.log('❌ No Figma connection configured');
          res.status(400).json({ 
            error: 'Figma connection not configured. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID in your .env file.',
            tokens: [],
            components: [],
            pages: []
          });
          return;
        }

        // Real Figma sync
        console.log('🔗 Performing real Figma sync...');
        const tokens = await this.extractDesignTokens();
        const components = await this.extractComponents();
        const pages = await this.extractPages();

        res.json({
          tokens,
          components,
          pages
        });
      } catch (error) {
        console.error('❌ Error in full sync:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Generate preview endpoint
    this.app.post('/api/mcp/figma/generate-preview', async (req, res) => {
      try {
        const { componentId } = req.body;
        
        if (!componentId) {
          return res.status(400).json({ error: 'Component ID is required' });
        }

        // Generate a more realistic component preview
        const componentName = componentId.replace(/[^a-zA-Z0-9]/g, ' ').trim();
        const isConnected = this.figmaToken && this.fileId;
        
        // Create different preview styles based on component type and name
        let previewSvg = '';
        
        // Enhanced component detection with more patterns
        const componentLower = componentId.toLowerCase();
        const componentNameLower = componentName.toLowerCase();
        
        if (componentLower.includes('button') || componentLower.includes('btn') || componentNameLower.includes('button')) {
          // Button component preview
          previewSvg = `
            <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
                </linearGradient>
                <filter id="buttonShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000020"/>
                </filter>
              </defs>
              <rect width="200" height="80" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="50" y="20" width="100" height="40" rx="8" fill="url(#buttonGradient)" filter="url(#buttonShadow)"/>
              <text x="100" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="600" font-family="system-ui">Button</text>
              <text x="100" y="65" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('card') || componentNameLower.includes('card') || componentNameLower.includes('profile')) {
          // Card component preview
          previewSvg = `
            <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00000015"/>
                </filter>
              </defs>
              <rect width="200" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="20" y="20" width="160" height="80" rx="12" fill="white" filter="url(#cardShadow)"/>
              <rect x="30" y="30" width="140" height="8" rx="4" fill="#e2e8f0"/>
              <rect x="30" y="45" width="100" height="6" rx="3" fill="#e2e8f0"/>
              <rect x="30" y="55" width="80" height="6" rx="3" fill="#e2e8f0"/>
              <rect x="30" y="70" width="60" height="20" rx="6" fill="#3b82f6"/>
              <text x="100" y="105" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('input') || componentLower.includes('field') || componentNameLower.includes('input') || componentNameLower.includes('text')) {
          // Input component preview
          previewSvg = `
            <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="80" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="30" y="25" width="140" height="30" rx="6" fill="white" stroke="#d1d5db" stroke-width="1"/>
              <text x="40" y="45" fill="#9ca3af" font-size="12" font-family="system-ui">Enter text...</text>
              <text x="100" y="65" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('modal') || componentLower.includes('dialog') || componentNameLower.includes('modal') || componentNameLower.includes('popup')) {
          // Modal component preview
          previewSvg = `
            <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="modalShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#00000030"/>
                </filter>
              </defs>
              <rect width="200" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="25" y="30" width="150" height="60" rx="12" fill="white" filter="url(#modalShadow)"/>
              <rect x="35" y="40" width="130" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="35" y="50" width="100" height="3" rx="1.5" fill="#e2e8f0"/>
              <rect x="35" y="60" width="80" height="3" rx="1.5" fill="#e2e8f0"/>
              <rect x="35" y="70" width="40" height="12" rx="6" fill="#ef4444"/>
              <rect x="85" y="70" width="40" height="12" rx="6" fill="#3b82f6"/>
              <text x="100" y="105" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('vehicle') || componentLower.includes('plate') || componentLower.includes('license')) {
          // Vehicle plate component preview
          previewSvg = `
            <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="plateShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#00000020"/>
                </filter>
              </defs>
              <rect width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="30" y="25" width="140" height="50" rx="8" fill="#fbbf24" filter="url(#plateShadow)"/>
              <rect x="35" y="30" width="130" height="40" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
              <text x="100" y="55" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="monospace">ABC-123</text>
              <text x="100" y="85" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('logo') || componentNameLower.includes('logo') || componentNameLower.includes('brand')) {
          // Logo component preview
          previewSvg = `
            <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="60" y="30" width="80" height="40" rx="8" fill="url(#logoGradient)"/>
              <text x="100" y="55" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="system-ui">LOGO</text>
              <text x="100" y="85" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('icon') || componentNameLower.includes('icon')) {
          // Icon component preview
          previewSvg = `
            <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <circle cx="100" cy="45" r="20" fill="#3b82f6"/>
              <path d="M90 35 L110 35 L110 55 L90 55 Z" fill="white"/>
              <text x="100" y="85" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('badge') || componentNameLower.includes('badge') || componentNameLower.includes('tag')) {
          // Badge/Tag component preview
          previewSvg = `
            <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="80" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="70" y="25" width="60" height="30" rx="15" fill="#10b981"/>
              <text x="100" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="600" font-family="system-ui">NEW</text>
              <text x="100" y="65" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else if (componentLower.includes('avatar') || componentNameLower.includes('avatar') || componentNameLower.includes('user')) {
          // Avatar component preview
          previewSvg = `
            <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <circle cx="100" cy="45" r="25" fill="#3b82f6"/>
              <circle cx="100" cy="35" r="8" fill="white"/>
              <path d="M85 55 Q100 65 115 55" stroke="white" stroke-width="3" fill="none"/>
              <text x="100" y="85" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        } else {
          // Enhanced generic component preview with more visual interest
          previewSvg = `
            <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="componentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#f1f5f9;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
                </linearGradient>
                <filter id="componentShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#00000010"/>
                </filter>
              </defs>
              <rect width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
              <rect x="20" y="20" width="160" height="60" rx="8" fill="url(#componentGradient)" filter="url(#componentShadow)"/>
              <circle cx="60" cy="40" r="8" fill="#3b82f6"/>
              <rect x="80" y="35" width="80" height="4" rx="2" fill="#64748b"/>
              <rect x="80" y="45" width="60" height="4" rx="2" fill="#94a3b8"/>
              <rect x="80" y="55" width="40" height="4" rx="2" fill="#cbd5e1"/>
              <text x="100" y="85" text-anchor="middle" fill="#64748b" font-size="10" font-family="system-ui">${componentName}</text>
            </svg>
          `;
        }

        const preview = `data:image/svg+xml;base64,${Buffer.from(previewSvg).toString('base64')}`;

        const code = `// Generated code for component ${componentId}
// This would contain the actual Angular component code
// Generated at: ${new Date().toISOString()}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-${componentId.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}',
  templateUrl: './${componentId.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.component.html',
  styleUrls: ['./${componentId.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.component.scss']
})
export class ${componentId.replace(/[^a-zA-Z0-9]/g, '')}Component {
  @Input() variant: string = 'default';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  // Component properties would be extracted from Figma
  // when connected to a real Figma file
}`;

        res.json({
          preview,
          code,
          status: isConnected ? 'connected' : 'demo'
        });
      } catch (error) {
        console.error('Error generating preview:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Auto-sync endpoints
    this.app.get('/api/mcp/figma/auto-sync', (req, res) => {
      try {
        const response = {
          enabled: this.autoSyncEnabled,
          interval: this.autoSyncInterval,
          lastAutoSync: this.lastAutoSync,
          error: this.autoSyncError,
          canEnable: !config.development.disableAutoSync,
          developmentMode: config.development.disableAutoSync,
          nextSync: this.lastAutoSync ? new Date(Date.parse(this.lastAutoSync) + this.autoSyncInterval).toISOString() : null
        };
        res.json(response);
      } catch (error) {
        console.error('Error getting auto-sync status:', error);
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/mcp/figma/auto-sync', (req, res) => {
      try {
        const { enabled, interval } = req.body;
        
        if (enabled !== undefined) {
          this.autoSyncEnabled = enabled;
          console.log(`🤖 Auto-sync ${enabled ? 'enabled' : 'disabled'}`);
          
          if (enabled) {
            this.startAutoSync();
          } else {
            this.stopAutoSync();
          }
        }
        
        if (interval !== undefined) {
          this.autoSyncInterval = Math.max(interval, config.autoSync.minInterval);
          console.log(`⏱️ Auto-sync interval set to ${this.autoSyncInterval}ms`);
        }
        
        res.json({
          success: true,
          enabled: this.autoSyncEnabled,
          interval: this.autoSyncInterval
        });
      } catch (error) {
        console.error('Error updating auto-sync:', error);
        res.status(500).json({ error: error.message });
      }
    });
  }

  async makeFigmaRequest(endpoint) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.figma.com',
        path: `/v1${endpoint}`,
        method: 'GET',
        headers: {
          'X-Figma-Token': this.figmaToken,
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
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  // Enhanced Figma request with rate limiting and retry logic
  async makeFigmaRequestWithRateLimit(endpoint) {
    return this.makeFigmaRequestWithRetry(endpoint);
  }

  async extractDesignTokens() {
    if (!this.figmaToken || !this.fileId) {
      console.log('❌ No Figma connection configured for token extraction');
      throw new Error('Figma connection not configured. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID in your .env file.');
    }

    const file = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
    const tokens = [];

    console.log('📄 Figma file loaded, full structure:', {
      hasDocument: !!file.document,
      documentType: file.document?.type,
      documentName: file.document?.name,
      hasChildren: !!file.document?.children,
      childrenCount: file.document?.children?.length || 0,
      fileKeys: Object.keys(file || {}),
      documentKeys: Object.keys(file.document || {}),
      fullResponse: JSON.stringify(file, null, 2)
    });

    // Check if we have a document or if the structure is different
    const rootNode = file.document || file;
    
    if (rootNode) {
      console.log('🔍 Root node structure:', {
        type: rootNode.type,
        name: rootNode.name,
        id: rootNode.id,
        hasChildren: !!rootNode.children,
        childrenCount: rootNode.children?.length || 0
      });
      this.traverseNodesForTokens(rootNode, tokens);
    } else {
      console.log('⚠️ No root node found in Figma file');
    }
    
    console.log(`🎨 Extracted ${tokens.length} design tokens`);
    return tokens;
  }

  traverseNodesForTokens(node, tokens) {
    // Safety check - ensure node exists and has required properties
    if (!node) {
      console.log('⚠️ Skipping undefined node');
      return;
    }
    
    if (!node.id || !node.name) {
      console.log('⚠️ Skipping node without id or name:', { type: node.type, id: node.id });
      return;
    }

    // Extract colors from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill && fill.type === 'SOLID' && fill.color) {
          const color = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
          tokens.push({
            id: `${node.id}-color`,
            name: node.name,
            type: 'color',
            value: color,
            description: `Color from ${node.name}`
          });
        }
      });
    }

    // Extract typography
    if (node.style && node.style.fontFamily) {
      const fontFamily = node.style.fontFamily;
      const fontSize = node.style.fontSize;
      const fontWeight = node.style.fontWeight;
      
      if (fontFamily || fontSize || fontWeight) {
        tokens.push({
          id: `${node.id}-typography`,
          name: node.name,
          type: 'typography',
          value: {
            fontFamily: fontFamily || 'Inter',
            fontSize: fontSize ? `${fontSize}px` : '16px',
            fontWeight: fontWeight || '400'
          },
          description: `Typography from ${node.name}`
        });
      }
    }

    // Extract spacing
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      tokens.push({
        id: `${node.id}-spacing`,
        name: node.name,
        type: 'spacing',
        value: {
          padding: `${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px`
        },
        description: `Spacing from ${node.name}`
      });
    }

    // Extract border radius
    if (node.cornerRadius) {
      tokens.push({
        id: `${node.id}-radius`,
        name: node.name,
        type: 'borderRadius',
        value: `${node.cornerRadius}px`,
        description: `Border radius from ${node.name}`
      });
    }

    // Extract shadows
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach(effect => {
        if (effect && effect.type === 'DROP_SHADOW') {
          tokens.push({
            id: `${node.id}-shadow`,
            name: node.name,
            type: 'shadow',
            value: this.formatShadow(effect),
            description: `Shadow from ${node.name}`
          });
        }
      });
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        if (child) {
          this.traverseNodesForTokens(child, tokens);
        }
      });
    }
  }

  async extractComponents() {
    if (!this.figmaToken || !this.fileId) {
      console.log('❌ No Figma connection configured for component extraction');
      throw new Error('Figma connection not configured. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID in your .env file.');
    }

    const file = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
    const components = [];

    // Use the same root node approach as tokens
    const rootNode = file.document || file;
    
    if (rootNode) {
      console.log('🔍 Extracting components from root node:', {
        type: rootNode.type,
        name: rootNode.name,
        id: rootNode.id
      });
      await this.findComponents(rootNode, components);
    } else {
      console.log('⚠️ No root node found for component extraction');
    }
    
    console.log(`🧩 Extracted ${components.length} components`);
    return components;
  }

  async findComponents(node, components) {
    // Safety check
    if (!node) {
      return;
    }

    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        variants: this.extractVariants(node),
        properties: this.extractProperties(node),
        preview: null, // Will be generated in batch later
        lastModified: new Date().toISOString()
      });
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child) {
          await this.findComponents(child, components);
        }
      }
    }
  }

  // Batch generate preview images for efficiency
  async generateBatchPreviews(items, itemType = 'component') {
    if (!items || items.length === 0) return items;

    console.log(`🖼️ Generating batch previews for ${items.length} ${itemType}s...`);
    
    // Group items into batches of 10 (Figma API limit)
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      const ids = batch.map(item => item.id).join(',');
      
      try {
        console.log(`📸 Batch ${batchIndex + 1}/${batches.length}: Generating previews for ${batch.length} ${itemType}s`);
        const imageResponse = await this.makeFigmaRequestWithRateLimit(`/images/${this.fileId}?ids=${ids}&format=png&scale=1`);
        
        if (imageResponse.images) {
          batch.forEach(item => {
            if (imageResponse.images[item.id]) {
              item.preview = imageResponse.images[item.id];
            }
          });
        }
        
        // Update progress
        const progress = Math.round(((batchIndex + 1) / batches.length) * 100);
        console.log(`✅ Batch ${batchIndex + 1} complete (${progress}%)`);
        
      } catch (error) {
        console.log(`❌ Failed to generate previews for batch ${batchIndex + 1}:`, error.message);
      }
    }

    return items;
  }

  extractVariants(component) {
    const variants = [];
    
    if (component.children && Array.isArray(component.children)) {
      component.children.forEach(child => {
        if (child.type === 'INSTANCE') {
          variants.push(child.name);
        }
      });
    }

    return variants;
  }

  extractProperties(node) {
    return {
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      fills: node.fills,
      strokes: node.strokes,
      effects: node.effects,
      cornerRadius: node.cornerRadius,
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom
    };
  }

  async extractPages() {
    if (!this.figmaToken || !this.fileId) {
      console.log('❌ No Figma connection configured for page extraction');
      throw new Error('Figma connection not configured. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID in your .env file.');
    }

    const file = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
    const pages = [];

    // Use the same root node approach
    const rootNode = file.document || file;
    
    if (rootNode && rootNode.children && Array.isArray(rootNode.children)) {
      console.log('🔍 Extracting pages from root node:', {
        type: rootNode.type,
        name: rootNode.name,
        childrenCount: rootNode.children.length
      });
      
      for (const page of rootNode.children) {
        if (page && page.id && page.name) {
          // Enhanced page extraction with detailed content
          const enhancedPage = {
            id: page.id,
            name: page.name,
            type: page.type,
            children: page.children || [],
            preview: null, // Will be generated in batch later
            lastModified: new Date().toISOString(),
            // Enhanced properties for flow visualization
            flowData: {
              interactions: [],
              navigationElements: [],
              componentInstances: [],
              connections: [],
              subPages: []
            }
          };

          // Extract detailed page content
          enhancedPage.flowData = this.extractPageFlowData(page);
          
          // Special handling for Screenshots container
          if (page.name.toLowerCase().includes('screenshot')) {
            console.log(`📸 Found Screenshots container: ${page.name}`);
            this.extractPagesFromScreenshots(page, enhancedPage.flowData);
          }
          
          pages.push(enhancedPage);
        }
      }
      
      // Also look for Screenshots in nested structures
      this.findScreenshotsInNestedStructure(rootNode, pages);
    } else {
      console.log('⚠️ No children found in root node for page extraction');
    }
    
    console.log(`📄 Extracted ${pages.length} pages with flow data`);
    return pages;
  }

  extractPageFlowData(page) {
    const flowData = {
      interactions: [],
      navigationElements: [],
      componentInstances: [],
      connections: [],
      clickableElements: [],
      subPages: [] // Extract individual pages from containers
    };

    // Recursively traverse page content
    this.traversePageForFlowData(page, flowData);
    
    return flowData;
  }

  traversePageForFlowData(node, flowData) {
    if (!node) return;

    // Check for interactions
    if (node.interactions && Array.isArray(node.interactions) && node.interactions.length > 0) {
      flowData.interactions.push({
        elementId: node.id,
        elementName: node.name,
        interactions: node.interactions
      });
    }

    // Check for individual page screenshots (FRAME type with specific naming)
    if (this.isIndividualPage(node)) {
      flowData.subPages.push({
        id: node.id,
        name: node.name,
        type: node.type,
        bounds: node.absoluteBoundingBox,
        isIndividualPage: true,
        children: node.children || []
      });
    }
    
    // Additional check: Look for any frame or rectangle that could be a page (more aggressive)
    if ((node.type === 'FRAME' || node.type === 'RECTANGLE') && node.absoluteBoundingBox) {
      const isLargeEnough = node.absoluteBoundingBox.width >= 300 && node.absoluteBoundingBox.height >= 400;
      const hasContent = node.children && Array.isArray(node.children) && node.children.length >= 2;
      const isNotContainer = !['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'].some(keyword => 
        node.name.toLowerCase().includes(keyword)
      );
      
      // For RECTANGLE elements (images), check if they look like page screenshots
      const isImageScreenshot = node.type === 'RECTANGLE' && 
                               node.name.toLowerCase().includes('image') &&
                               node.absoluteBoundingBox.width >= 1000 && 
                               node.absoluteBoundingBox.height >= 800;
      
      if ((isLargeEnough && hasContent && isNotContainer) || isImageScreenshot) {
        // Check if this page is not already added
        const alreadyExists = flowData.subPages.some(subPage => subPage.id === node.id);
        if (!alreadyExists) {
          console.log(`🎯 Found potential page: "${node.name}" (${node.absoluteBoundingBox.width}x${node.absoluteBoundingBox.height}) - Type: ${node.type}`);
          flowData.subPages.push({
            id: node.id,
            name: node.name,
            type: node.type,
            bounds: node.absoluteBoundingBox,
            isIndividualPage: true,
            children: node.children || []
          });
        }
      }
    }
    
    // Special handling for Screenshots container - look deeper for individual pages
    if (node.name && node.name.toLowerCase().includes('screenshots')) {
      console.log(`🔍 Processing Screenshots container: "${node.name}"`);
      this.extractPagesFromScreenshots(node, flowData);
    }

    // Check for clickable elements (buttons, links, etc.)
    if (this.isClickableElement(node)) {
      flowData.clickableElements.push({
        id: node.id,
        name: node.name,
        type: node.type,
        bounds: node.absoluteBoundingBox,
        componentId: node.componentId,
        text: node.characters || node.name
      });
    }

    // Check for component instances
    if (node.type === 'INSTANCE' && node.componentId) {
      flowData.componentInstances.push({
        id: node.id,
        name: node.name,
        componentId: node.componentId,
        bounds: node.absoluteBoundingBox,
        overrides: node.overrides || []
      });
    }

    // Check for navigation-related elements
    if (this.isNavigationElement(node)) {
      flowData.navigationElements.push({
        id: node.id,
        name: node.name,
        type: node.type,
        bounds: node.absoluteBoundingBox,
        text: node.characters || node.name
      });
    }

    // Recursively process children
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        this.traversePageForFlowData(child, flowData);
      }
    }
  }
  
  findScreenshotsInNestedStructure(node, pages) {
    if (!node.children || !Array.isArray(node.children)) {
      return;
    }
    
    for (const child of node.children) {
      // Check if this child is a Screenshots container
      if (child.name && child.name.toLowerCase().includes('screenshot')) {
        console.log(`📸 Found nested Screenshots container: ${child.name}`);
        
        // Create a new page entry for this Screenshots container
        const screenshotsPage = {
          id: child.id,
          name: child.name,
          type: child.type,
          children: child.children || [],
          preview: null,
          lastModified: new Date().toISOString(),
          flowData: {
            interactions: [],
            navigationElements: [],
            componentInstances: [],
            connections: [],
            subPages: []
          }
        };
        
        // Extract individual pages from this Screenshots container
        this.extractPagesFromScreenshots(child, screenshotsPage.flowData);
        
        pages.push(screenshotsPage);
      }
      
      // Recursively search deeper
      if (child.children && Array.isArray(child.children)) {
        this.findScreenshotsInNestedStructure(child, pages);
      }
    }
  }
  
  extractPagesFromScreenshots(screenshotsNode, flowData) {
    if (!screenshotsNode.children || !Array.isArray(screenshotsNode.children)) {
      return;
    }
    
    console.log(`📋 Found ${screenshotsNode.children.length} direct children in Screenshots`);
    
    // Look through all children recursively
    this.findIndividualPagesRecursive(screenshotsNode, flowData);
  }
  
  findIndividualPagesRecursive(node, flowData) {
    if (!node.children || !Array.isArray(node.children)) {
      return;
    }
    
    for (const child of node.children) {
      // Check if this child is a potential individual page (FRAME or RECTANGLE)
      if ((child.type === 'FRAME' || child.type === 'RECTANGLE') && child.absoluteBoundingBox) {
        const isLargeEnough = child.absoluteBoundingBox.width >= 200 && child.absoluteBoundingBox.height >= 300;
        const hasContent = child.children && Array.isArray(child.children) && child.children.length >= 1;
        const isNotContainer = !['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'].some(keyword => 
          child.name.toLowerCase().includes(keyword)
        );
        
        // For RECTANGLE elements (images), check if they look like page screenshots
        const isImageScreenshot = child.type === 'RECTANGLE' && 
                                 (child.name.toLowerCase().includes('image') || 
                                  child.name.toLowerCase().includes('screenshot') ||
                                  child.name.toLowerCase().includes('page')) &&
                                 child.absoluteBoundingBox.width >= 800 && 
                                 child.absoluteBoundingBox.height >= 600;
        
        // More aggressive detection for any large RECTANGLE in Screenshots context
        const isLargeRectangle = child.type === 'RECTANGLE' && 
                                child.absoluteBoundingBox.width >= 1000 && 
                                child.absoluteBoundingBox.height >= 800;
        
        if ((isLargeEnough && hasContent && isNotContainer) || isImageScreenshot || isLargeRectangle) {
          // Check if this page is not already added
          const alreadyExists = flowData.subPages.some(subPage => subPage.id === child.id);
          if (!alreadyExists) {
            console.log(`🎯 Found individual page in Screenshots: "${child.name}" (${child.absoluteBoundingBox.width}x${child.absoluteBoundingBox.height}) - Type: ${child.type}`);
            flowData.subPages.push({
              id: child.id,
              name: child.name,
              type: child.type,
              bounds: child.absoluteBoundingBox,
              isIndividualPage: true,
              children: child.children || []
            });
          }
        }
      }
      
      // Recursively check nested children
      if (child.children && Array.isArray(child.children)) {
        this.findIndividualPagesRecursive(child, flowData);
      }
    }
  }
  
  extractIndividualPagesFromContainer(container) {
    const individualPages = [];
    
    if (!container.children || !Array.isArray(container.children)) {
      return individualPages;
    }
    
    console.log(`🔍 Extracting individual pages from container: "${container.name}"`);
    
    // Recursively find all individual pages in this container
    this.findIndividualPagesInContainer(container, individualPages);
    
    // Generate proper preview URLs for each individual page
    individualPages.forEach(page => {
      if (page.bounds) {
        const width = Math.round(page.bounds.width);
        const height = Math.round(page.bounds.height);
        
        // Generate appropriate preview based on page type and content
        if (page.type === 'RECTANGLE') {
          // For RECTANGLE elements (images), try to get actual Figma preview
          page.preview = this.generateFigmaImageUrl(page.id, width, height);
        } else if (page.type === 'FRAME') {
          // For FRAME elements, check if they have meaningful content
          const hasContent = page.children && page.children.length > 0;
          if (hasContent) {
            // Use a more descriptive placeholder for frames with content
            page.preview = `https://via.placeholder.com/${width}x${height}/4CAF50/ffffff?text=${encodeURIComponent(page.name)}`;
          } else {
            // Use a neutral placeholder for empty frames
            page.preview = `https://via.placeholder.com/${width}x${height}/9E9E9E/ffffff?text=${encodeURIComponent(page.name)}`;
          }
        } else {
          // For other types, use a generic placeholder
          page.preview = `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(page.name)}`;
        }
        
        // Add additional metadata for debugging
        page.previewInfo = {
          nodeId: page.id,
          nodeType: page.type,
          dimensions: `${width}x${height}`,
          childrenCount: page.children ? page.children.length : 0
        };
      } else {
        // Fallback for pages without bounds
        page.preview = `https://via.placeholder.com/400x300/ff9800/ffffff?text=${encodeURIComponent(page.name)}`;
        page.previewInfo = {
          nodeId: page.id,
          nodeType: page.type,
          dimensions: 'unknown',
          childrenCount: page.children ? page.children.length : 0
        };
      }
    });
    
    console.log(`✅ Extracted ${individualPages.length} individual pages from "${container.name}"`);
    return individualPages;
  }
  
  findIndividualPagesInContainer(node, individualPages) {
    if (!node.children || !Array.isArray(node.children)) {
      return;
    }
    
    for (const child of node.children) {
      // Check if this child is a potential individual page
      if ((child.type === 'FRAME' || child.type === 'RECTANGLE') && child.absoluteBoundingBox) {
        const isLargeEnough = child.absoluteBoundingBox.width >= 200 && child.absoluteBoundingBox.height >= 300;
        const hasContent = child.children && Array.isArray(child.children) && child.children.length >= 1;
        const isNotContainer = !['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'].some(keyword => 
          child.name.toLowerCase().includes(keyword)
        );
        
        // For RECTANGLE elements (images), check if they look like page screenshots
        const isImageScreenshot = child.type === 'RECTANGLE' && 
                                 (child.name.toLowerCase().includes('image') || 
                                  child.name.toLowerCase().includes('screenshot') ||
                                  child.name.toLowerCase().includes('page')) &&
                                 child.absoluteBoundingBox.width >= 800 && 
                                 child.absoluteBoundingBox.height >= 600;
        
        // More aggressive detection for any large RECTANGLE in Screenshots context
        const isLargeRectangle = child.type === 'RECTANGLE' && 
                                child.absoluteBoundingBox.width >= 1000 && 
                                child.absoluteBoundingBox.height >= 800;
        
        if ((isLargeEnough && hasContent && isNotContainer) || isImageScreenshot || isLargeRectangle) {
          // Check if this page is not already added
          const alreadyExists = individualPages.some(page => page.id === child.id);
          if (!alreadyExists) {
            console.log(`🎯 Found individual page: "${child.name}" (${child.absoluteBoundingBox.width}x${child.absoluteBoundingBox.height}) - Type: ${child.type}`);
            // Create individual page with flow data
            const individualPage = {
              id: child.id,
              name: child.name,
              type: child.type,
              bounds: child.absoluteBoundingBox,
              children: child.children || [],
              lastModified: child.lastModified || new Date().toISOString(),
              // Add flow data for the individual page
              flowData: this.extractPageFlowData(child)
            };
            
            // Generate preview for the individual page
            if (individualPage.bounds) {
              const width = Math.round(individualPage.bounds.width);
              const height = Math.round(individualPage.bounds.height);
              
              if (individualPage.type === 'RECTANGLE') {
                individualPage.preview = this.generateFigmaImageUrl(individualPage.id, width, height);
              } else if (individualPage.type === 'FRAME') {
                const hasContent = individualPage.children && individualPage.children.length > 0;
                if (hasContent) {
                  individualPage.preview = `https://via.placeholder.com/${width}x${height}/4CAF50/ffffff?text=${encodeURIComponent(individualPage.name)}`;
                } else {
                  individualPage.preview = `https://via.placeholder.com/${width}x${height}/9E9E9E/ffffff?text=${encodeURIComponent(individualPage.name)}`;
                }
              } else {
                individualPage.preview = `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(individualPage.name)}`;
              }
              
              // Add preview info for debugging
              individualPage.previewInfo = {
                nodeId: individualPage.id,
                nodeType: individualPage.type,
                dimensions: `${width}x${height}`,
                childrenCount: individualPage.children ? individualPage.children.length : 0
              };
            } else {
              // Fallback for pages without bounds
              individualPage.preview = `https://via.placeholder.com/400x300/ff9800/ffffff?text=${encodeURIComponent(individualPage.name)}`;
              individualPage.previewInfo = {
                nodeId: individualPage.id,
                nodeType: individualPage.type,
                dimensions: 'unknown',
                childrenCount: individualPage.children ? individualPage.children.length : 0
              };
            }
            
            individualPages.push(individualPage);
          }
        }
      }
      
      // Recursively check nested children
      if (child.children && Array.isArray(child.children)) {
        this.findIndividualPagesInContainer(child, individualPages);
      }
    }
  }
  
  generateFigmaImageUrl(nodeId, width, height) {
    try {
      // Generate a proper Figma image API URL
      const scale = 1;
      const format = 'png';
      const imageUrl = `https://www.figma.com/file/${this.figmaFileId}/?node-id=${nodeId}&scale=${scale}&format=${format}`;
      
      // For now, return a placeholder with the node info
      // In a production environment, you would make an API call to get the actual image
      return `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(`Figma Node: ${nodeId}`)}`;
    } catch (error) {
      console.error('❌ Error generating Figma image URL:', error);
      return `https://via.placeholder.com/${width}x${height}/ff6b6b/ffffff?text=Image+Error`;
    }
  }

  generateHtmlPreview(page) {
    try {
      console.log(`🌐 Generating HTML preview for: ${page.name}`);
      
      // Extract page dimensions
      const width = page.bounds ? Math.round(page.bounds.width) : 800;
      const height = page.bounds ? Math.round(page.bounds.height) : 600;
      
      // Generate HTML based on page content
      let htmlContent = '';
      
      if (page.children && page.children.length > 0) {
        htmlContent = this.generateHtmlFromChildren(page.children);
      } else {
        htmlContent = this.generatePlaceholderHtml(page);
      }
      
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name} - HTML Preview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .preview-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
            max-width: 100%;
            max-height: 100%;
        }
        
        .preview-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            text-align: center;
        }
        
        .preview-content {
            width: ${width}px;
            height: ${height}px;
            position: relative;
            background: white;
            overflow: hidden;
        }
        
        .page-content {
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .element {
            position: absolute;
            border: 1px solid #e9ecef;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .element:hover {
            background: #667eea;
            color: white;
            transform: scale(1.02);
        }
        
        .element.text {
            background: transparent;
            border: none;
            color: #333;
            font-weight: 500;
        }
        
        .element.button {
            background: #667eea;
            color: white;
            border-radius: 6px;
            border: none;
        }
        
        .element.image {
            background: #e9ecef;
            border: 2px dashed #ccc;
        }
        
        .placeholder-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #666;
            text-align: center;
            padding: 40px;
        }
        
        .placeholder-icon {
            font-size: 48px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .placeholder-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        
        .placeholder-subtitle {
            font-size: 14px;
            opacity: 0.7;
        }
        
        .page-info {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <h2>${page.name}</h2>
            <p>HTML Preview - ${width}×${height}</p>
        </div>
        <div class="preview-content">
            <div class="page-content">
                ${htmlContent}
                <div class="page-info">
                    📄 ${page.type} | 🧩 ${page.children ? page.children.length : 0} elements
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Add interactivity to elements
        document.querySelectorAll('.element').forEach(element => {
            element.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const type = this.getAttribute('data-type');
                alert(\`Clicked: \${name} (\${type})\`);
            });
        });
    </script>
</body>
</html>`;
      
      return html;
    } catch (error) {
      console.error('❌ Error generating HTML preview:', error);
      return this.generateErrorHtml(page, error.message);
    }
  }

  generateHtmlFromChildren(children) {
    let html = '';
    
    children.forEach((child, index) => {
      if (!child.absoluteBoundingBox) return;
      
      const x = child.absoluteBoundingBox.x || 0;
      const y = child.absoluteBoundingBox.y || 0;
      const width = child.absoluteBoundingBox.width || 100;
      const height = child.absoluteBoundingBox.height || 50;
      
      let elementClass = 'element';
      let content = child.name || `Element ${index + 1}`;
      
      // Determine element type and styling
      if (child.type === 'TEXT') {
        elementClass += ' text';
        content = child.characters || child.name || 'Text';
      } else if (this.isClickableElement(child)) {
        elementClass += ' button';
      } else if (child.type === 'RECTANGLE' && child.fills) {
        elementClass += ' image';
        content = '🖼️';
      }
      
      html += '<div class="' + elementClass + '" ' +
              'style="left: ' + x + 'px; top: ' + y + 'px; width: ' + width + 'px; height: ' + height + 'px;" ' +
              'data-name="' + (child.name || 'Unknown') + '" ' +
              'data-type="' + (child.type || 'Unknown') + '" ' +
              'title="' + (child.name || 'Element') + '">' +
              content +
              '</div>';
    });
    
    return html;
  }

  generatePlaceholderHtml(page) {
    return '<div class="placeholder-content">' +
           '<div class="placeholder-icon">📄</div>' +
           '<div class="placeholder-title">' + page.name + '</div>' +
           '<div class="placeholder-subtitle">' +
           'This is a preview of the page structure.<br>' +
           'No detailed content available.' +
           '</div>' +
           '</div>';
  }

  generateErrorHtml(page, error) {
    return '<div class="placeholder-content">' +
           '<div class="placeholder-icon">❌</div>' +
           '<div class="placeholder-title">Preview Error</div>' +
           '<div class="placeholder-subtitle">' +
           'Failed to generate preview for ' + page.name + '<br>' +
           'Error: ' + error +
           '</div>' +
           '</div>';
  }

  generateComponentHtmlPreview(component) {
    try {
      // Check if HTML preview is already cached in file storage
      const componentCacheKey = `${component.id}_${component.lastModified || 'unknown'}`;
      
      if (this.htmlPreviewCache.has(componentCacheKey)) {
        console.log(`🌐 Using cached HTML preview for component: ${component.name}`);
        return this.htmlPreviewCache.get(componentCacheKey);
      }
      
      console.log(`🌐 Generating new HTML preview for component: ${component.name}`);
      console.log(`🔍 Component data:`, {
        id: component.id,
        name: component.name,
        type: component.type,
        hasChildren: !!(component.children && component.children.length > 0),
        childrenCount: component.children ? component.children.length : 0,
        properties: component.properties,
        variants: component.variants
      });
      
      // Extract component dimensions and properties
      const width = component.absoluteBoundingBox ? Math.round(component.absoluteBoundingBox.width) : 200;
      const height = component.absoluteBoundingBox ? Math.round(component.absoluteBoundingBox.height) : 100;
      
      // Get design tokens for styling
      const tokens = this.cachedTokens || [];
      const colors = tokens.filter(t => t.type === 'color');
      const spacing = tokens.filter(t => t.type === 'spacing');
      const typography = tokens.filter(t => t.type === 'typography');
      
      console.log(`🎨 Available tokens:`, {
        colors: colors.length,
        spacing: spacing.length,
        typography: typography.length,
        total: tokens.length
      });
      
      // Generate CSS variables from tokens
      const cssVariables = this.generateCssVariablesFromTokens(tokens);
      
      // Generate HTML based on component type and properties
      let htmlContent = '';
      
      if (component.children && component.children.length > 0) {
        console.log(`📦 Using children data for component: ${component.name}`);
        htmlContent = this.generateComponentHtmlFromChildren(component.children, tokens);
      } else {
        console.log(`📦 No children data, generating from component properties: ${component.name}`);
        htmlContent = this.generateComponentHtmlFromProperties(component, tokens);
      }
      
      const html = '<!DOCTYPE html>' +
      '<html lang="en">' +
      '<head>' +
          '<meta charset="UTF-8">' +
          '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
          '<title>' + component.name + ' - Component Preview</title>' +
          '<style>' +
              '* {' +
                  'margin: 0;' +
                  'padding: 0;' +
                  'box-sizing: border-box;' +
              '}' +
              'body {' +
                  'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
                  'background: #f8f9fa;' +
                  'display: flex;' +
                  'justify-content: center;' +
                  'align-items: center;' +
                  'min-height: 100vh;' +
                  'padding: 20px;' +
              '}' +
              '.component-container {' +
                  'background: white;' +
                  'border-radius: 8px;' +
                  'box-shadow: 0 4px 20px rgba(0,0,0,0.1);' +
                  'overflow: hidden;' +
                  'max-width: 100%;' +
                  'max-height: 100%;' +
              '}' +
              '.component-header {' +
                  'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' +
                  'color: white;' +
                  'padding: 15px 20px;' +
                  'text-align: center;' +
              '}' +
              '.component-content {' +
                  'width: ' + width + 'px;' +
                  'height: ' + height + 'px;' +
                  'position: relative;' +
                  'background: white;' +
                  'overflow: hidden;' +
                  'padding: 20px;' +
              '}' +
              '.component-element {' +
                  'position: absolute;' +
                  'border: 1px solid #e9ecef;' +
                  'background: #f8f9fa;' +
                  'display: flex;' +
                  'align-items: center;' +
                  'justify-content: center;' +
                  'font-size: 12px;' +
                  'color: #666;' +
                  'cursor: pointer;' +
                  'transition: all 0.3s ease;' +
              '}' +
              '.component-element:hover {' +
                  'background: #667eea;' +
                  'color: white;' +
                  'transform: scale(1.02);' +
              '}' +
              '.component-element.text {' +
                  'background: transparent;' +
                  'border: none;' +
                  'color: #333;' +
                  'font-weight: 500;' +
              '}' +
              '.component-element.button {' +
                  'background: #667eea;' +
                  'color: white;' +
                  'border-radius: 6px;' +
                  'border: none;' +
                  'padding: 8px 16px;' +
              '}' +
              '.component-element.icon {' +
                  'background: var(--color-success, #28a745);' +
                  'color: white;' +
                  'border-radius: 50%;' +
                  'display: flex;' +
                  'align-items: center;' +
                  'justify-content: center;' +
                  'font-size: 14px;' +
                  'font-weight: bold;' +
              '}' +
              '.component-info {' +
                  'position: absolute;' +
                  'top: 10px;' +
                  'right: 10px;' +
                  'background: rgba(0,0,0,0.7);' +
                  'color: white;' +
                  'padding: 8px 12px;' +
                  'border-radius: 4px;' +
                  'font-size: 12px;' +
              '}' +
              '.placeholder-content {' +
                  'display: flex;' +
                  'flex-direction: column;' +
                  'align-items: center;' +
                  'justify-content: center;' +
                  'height: 100%;' +
                  'color: #666;' +
                  'text-align: center;' +
                  'padding: 40px;' +
              '}' +
              '.placeholder-icon {' +
                  'font-size: 48px;' +
                  'margin-bottom: 20px;' +
                  'opacity: 0.5;' +
              '}' +
              '.placeholder-title {' +
                  'font-size: 24px;' +
                  'font-weight: 600;' +
                  'margin-bottom: 10px;' +
                  'color: #333;' +
              '}' +
              '.placeholder-subtitle {' +
                  'font-size: 14px;' +
                  'opacity: 0.7;' +
              '}' +
              cssVariables +
          '</style>' +
      '</head>' +
      '<body>' +
          '<div class="component-container">' +
              '<div class="component-header">' +
                  '<h2>' + component.name + '</h2>' +
                  '<p>Component Preview - ' + width + '×' + height + '</p>' +
              '</div>' +
              '<div class="component-content">' +
                  htmlContent +
                  '<div class="component-info">' +
                      '🧩 ' + component.type + ' | 🎨 ' + (component.children ? component.children.length : 0) + ' elements' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<script>' +
              'document.querySelectorAll(".component-element").forEach(element => {' +
                  'element.addEventListener("click", function() {' +
                      'const name = this.getAttribute("data-name");' +
                      'const type = this.getAttribute("data-type");' +
                      'alert("Clicked: " + name + " (" + type + ")");' +
                  '});' +
              '});' +
          '</script>' +
      '</body>' +
      '</html>';
      
      // Cache the generated HTML preview
      this.htmlPreviewCache.set(componentCacheKey, html);
      this.saveHtmlPreviewCache();
      
      return html;
    } catch (error) {
      console.error('❌ Error generating component HTML preview:', error);
      return this.generateComponentErrorHtml(component, error.message);
    }
  }

  generateComponentHtmlFromChildren(children, tokens) {
    let html = '';
    
    children.forEach((child, index) => {
      if (!child.absoluteBoundingBox) return;
      
      const x = child.absoluteBoundingBox.x || 0;
      const y = child.absoluteBoundingBox.y || 0;
      const width = child.absoluteBoundingBox.width || 100;
      const height = child.absoluteBoundingBox.height || 50;
      
      let elementClass = 'component-element';
      let content = child.name || 'Element ' + (index + 1);
      let inlineStyles = `left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px;`;
      
      // Apply design tokens and Figma styles
      if (child.fills && child.fills.length > 0) {
        const fill = child.fills[0];
        if (fill.type === 'SOLID' && fill.color) {
          const color = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
          inlineStyles += ` background-color: ${color};`;
        }
      }
      
      if (child.strokes && child.strokes.length > 0) {
        const stroke = child.strokes[0];
        if (stroke.type === 'SOLID' && stroke.color) {
          const color = this.rgbaToHex(stroke.color.r, stroke.color.g, stroke.color.b, stroke.color.a);
          inlineStyles += ` border: 1px solid ${color};`;
        }
      }
      
      // Apply corner radius if available
      if (child.cornerRadius) {
        inlineStyles += ` border-radius: ${child.cornerRadius}px;`;
      }
      
      // Determine element type and styling
      if (child.type === 'TEXT') {
        elementClass += ' text';
        content = child.characters || child.name || 'Text';
        
        // Apply text styles
        if (child.style) {
          if (child.style.fontSize) {
            inlineStyles += ` font-size: ${child.style.fontSize}px;`;
          }
          if (child.style.fontWeight) {
            inlineStyles += ` font-weight: ${child.style.fontWeight};`;
          }
          if (child.style.textAlignHorizontal) {
            inlineStyles += ` text-align: ${child.style.textAlignHorizontal};`;
          }
        }
        
        // Apply text color
        if (child.fills && child.fills.length > 0) {
          const fill = child.fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            const color = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
            inlineStyles += ` color: ${color};`;
          }
        }
        
      } else if (this.isClickableElement(child)) {
        elementClass += ' button';
        // Apply button-specific styling
        inlineStyles += ` cursor: pointer; border-radius: 4px;`;
        
      } else if (child.type === 'ELLIPSE' || child.type === 'VECTOR') {
        elementClass += ' icon';
        content = '✓'; // Use checkmark for success icons
        
        // Apply icon-specific styling
        if (child.name && child.name.toLowerCase().includes('success')) {
          inlineStyles += ` background-color: #28a745; color: white;`;
        } else if (child.name && child.name.toLowerCase().includes('error')) {
          inlineStyles += ` background-color: #dc3545; color: white;`;
        } else if (child.name && child.name.toLowerCase().includes('warning')) {
          inlineStyles += ` background-color: #ffc107; color: #212529;`;
        } else if (child.name && child.name.toLowerCase().includes('info')) {
          inlineStyles += ` background-color: #17a2b8; color: white;`;
        }
        
        inlineStyles += ` border-radius: 50%; display: flex; align-items: center; justify-content: center;`;
      }
      
      html += '<div class="' + elementClass + '" ' +
              'style="' + inlineStyles + '" ' +
              'data-name="' + (child.name || 'Unknown') + '" ' +
              'data-type="' + (child.type || 'Unknown') + '" ' +
              'title="' + (child.name || 'Element') + '">' +
              content +
              '</div>';
    });
    
    return html;
  }

  generateComponentPlaceholderHtml(component) {
    return '<div class="placeholder-content">' +
           '<div class="placeholder-icon">🧩</div>' +
           '<div class="placeholder-title">' + component.name + '</div>' +
           '<div class="placeholder-subtitle">' +
           'Component preview<br>' +
           'No detailed content available' +
           '</div>' +
           '</div>';
  }

  generateComponentHtmlFromProperties(component, tokens) {
    console.log(`🎨 Generating HTML from properties for: ${component.name}`);
    
    // Find relevant design tokens based on component name
    const componentName = component.name.toLowerCase();
    let relevantTokens = [];
    
    // Look for tokens that match the component name or type
    tokens.forEach(token => {
      const tokenName = token.name.toLowerCase();
      if (tokenName.includes('alert') || tokenName.includes('info') || tokenName.includes('success') || 
          tokenName.includes('error') || tokenName.includes('warning') || tokenName.includes('link') ||
          tokenName.includes('tooltip') || tokenName.includes('callout') || tokenName.includes('heads')) {
        relevantTokens.push(token);
      }
    });
    
    console.log(`🎨 Found ${relevantTokens.length} relevant tokens for component: ${component.name}`);
    console.log(`🔍 Component name analysis: "${componentName}"`);
    console.log(`🔍 Checking for tooltip: ${componentName.includes('tooltip')}`);
    console.log(`🔍 Checking for heads-up: ${componentName.includes('heads-up')}`);
    
    // Generate HTML based on component type
    if (componentName.includes('tooltip') || componentName.includes('heads-up')) {
      console.log(`🎯 Using tooltip generation for: ${component.name}`);
      return this.generateTooltipComponentHtml(component, relevantTokens);
    } else if (componentName.includes('alert')) {
      console.log(`🎯 Using alert generation for: ${component.name}`);
      return this.generateAlertComponentHtml(component, relevantTokens);
    } else if (componentName.includes('button')) {
      console.log(`🎯 Using button generation for: ${component.name}`);
      return this.generateButtonComponentHtml(component, relevantTokens);
    } else if (componentName.includes('input')) {
      console.log(`🎯 Using input generation for: ${component.name}`);
      return this.generateInputComponentHtml(component, relevantTokens);
    } else {
      console.log(`🎯 Using generic generation for: ${component.name}`);
      return this.generateGenericComponentHtml(component, relevantTokens);
    }
  }

  generateTooltipComponentHtml(component, tokens) {
    console.log(`🎯 Generating tooltip HTML for: ${component.name}`);
    
    // Extract component data
    const componentName = component.name.toLowerCase();
    let bgColor = '#FFA500'; // Default orange
    let textColor = '#FFFFFF';
    let textContent = 'نص'; // Default Arabic text
    let arrowDirection = 'up';
    let borderRadius = '8px';
    let padding = '12px 16px';
    
    // Determine arrow direction from component name
    if (componentName.includes('arrow-up')) {
      arrowDirection = 'up';
    } else if (componentName.includes('arrow-down')) {
      arrowDirection = 'down';
    } else if (componentName.includes('arrow-left')) {
      arrowDirection = 'left';
    } else if (componentName.includes('arrow-right')) {
      arrowDirection = 'right';
    }
    
    // Find relevant tokens
    const colorToken = tokens.find(t => 
      t.name.toLowerCase().includes('orange') || 
      t.name.toLowerCase().includes('tooltip') || 
      t.name.toLowerCase().includes('callout') ||
      t.name.toLowerCase().includes('heads')
    );
    
    if (colorToken && colorToken.value) {
      bgColor = colorToken.value;
    }
    
    // Extract text content from component children if available
    if (component.children && component.children.length > 0) {
      const textChild = component.children.find(child => child.type === 'TEXT');
      if (textChild && textChild.characters) {
        textContent = textChild.characters;
      }
      
      // Extract styling from children
      const mainChild = component.children.find(child => child.type === 'RECTANGLE' || child.type === 'FRAME');
      if (mainChild) {
        if (mainChild.fills && mainChild.fills.length > 0) {
          const fill = mainChild.fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b } = fill.color;
            bgColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
          }
        }
        
        if (mainChild.cornerRadius) {
          borderRadius = `${mainChild.cornerRadius}px`;
        }
      }
    }
    
    // Generate arrow CSS based on direction
    let arrowCSS = '';
    if (arrowDirection === 'up') {
      arrowCSS = `
        position: absolute;
        top: -8px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid ${bgColor};
      `;
    } else if (arrowDirection === 'down') {
      arrowCSS = `
        position: absolute;
        bottom: -8px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid ${bgColor};
      `;
    } else if (arrowDirection === 'left') {
      arrowCSS = `
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid ${bgColor};
      `;
    } else if (arrowDirection === 'right') {
      arrowCSS = `
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid ${bgColor};
      `;
    }
    
    return `
      <div class="tooltip-callout" style="
        background-color: ${bgColor};
        color: ${textColor};
        padding: ${padding};
        border-radius: ${borderRadius};
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        max-width: 300px;
      ">
        <div class="tooltip-arrow" style="${arrowCSS}"></div>
        <div class="tooltip-content" style="
          text-align: center;
          direction: rtl;
          font-weight: 500;
        ">
          ${textContent}
        </div>
      </div>
    `;
  }

  generateAlertComponentHtml(component, tokens) {
    const componentName = component.name.toLowerCase();
    let alertType = 'info';
    let alertColor = '#17a2b8';
    let alertIcon = 'ℹ️';
    
    if (componentName.includes('success')) {
      alertType = 'success';
      alertColor = '#28a745';
      alertIcon = '✅';
    } else if (componentName.includes('error')) {
      alertType = 'error';
      alertColor = '#dc3545';
      alertIcon = '❌';
    } else if (componentName.includes('warning')) {
      alertType = 'warning';
      alertColor = '#ffc107';
      alertIcon = '⚠️';
    } else if (componentName.includes('info')) {
      alertType = 'info';
      alertColor = '#17a2b8';
      alertIcon = 'ℹ️';
    }
    
    // Find specific tokens for this alert type
    const colorToken = tokens.find(t => t.name.toLowerCase().includes(alertType));
    if (colorToken && colorToken.value) {
      alertColor = colorToken.value;
    }
    
    return `
      <div class="alert-component" style="
        background-color: ${alertColor}20;
        border: 1px solid ${alertColor};
        border-radius: 8px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: ${alertColor};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.5;
      ">
        <div class="alert-icon" style="font-size: 18px;">${alertIcon}</div>
        <div class="alert-content">
          <div class="alert-title" style="font-weight: 600; margin-bottom: 4px;">
            ${component.name.replace(/^.*\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div class="alert-message">
            ${componentName.includes('link') ? 'This is an informational alert with a link. Click here for more details.' : 'This is an informational alert message.'}
          </div>
        </div>
      </div>
    `;
  }

  generateButtonComponentHtml(component, tokens) {
    const componentName = component.name.toLowerCase();
    let buttonStyle = 'primary';
    let buttonColor = '#007bff';
    
    if (componentName.includes('secondary')) {
      buttonStyle = 'secondary';
      buttonColor = '#6c757d';
    } else if (componentName.includes('success')) {
      buttonStyle = 'success';
      buttonColor = '#28a745';
    } else if (componentName.includes('danger')) {
      buttonStyle = 'danger';
      buttonColor = '#dc3545';
    }
    
    // Find specific tokens for this button type
    const colorToken = tokens.find(t => t.name.toLowerCase().includes(buttonStyle));
    if (colorToken && colorToken.value) {
      buttonColor = colorToken.value;
    }
    
    return `
      <button class="button-component" style="
        background-color: ${buttonColor};
        color: white;
        border: none;
        border-radius: 6px;
        padding: 12px 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      " onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
        ${component.name.replace(/^.*\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </button>
    `;
  }

  generateInputComponentHtml(component, tokens) {
    return `
      <div class="input-component" style="
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <label style="font-size: 14px; font-weight: 500; color: #333;">
          ${component.name.replace(/^.*\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        <input type="text" placeholder="Enter text..." style="
          padding: 12px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s ease;
        " onfocus="this.style.borderColor='#007bff'" onblur="this.style.borderColor='#ced4da'">
      </div>
    `;
  }

  generateGenericComponentHtml(component, tokens) {
    return `
      <div class="generic-component" style="
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        text-align: center;
      ">
        <div style="font-size: 24px; margin-bottom: 12px;">⚡</div>
        <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 8px;">
          ${component.name.replace(/^.*\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
        <div style="font-size: 14px; color: #6c757d;">
          Component Preview
        </div>
      </div>
    `;
  }

  generateComponentErrorHtml(component, error) {
    return '<div class="placeholder-content">' +
           '<div class="placeholder-icon">❌</div>' +
           '<div class="placeholder-title">Component Error</div>' +
           '<div class="placeholder-subtitle">' +
           'Failed to generate preview for ' + component.name + '<br>' +
           'Error: ' + error +
           '</div>' +
           '</div>';
  }

  generateCssVariablesFromTokens(tokens) {
    let css = '';
    
    tokens.forEach(token => {
      if (token.type === 'color') {
        const tokenName = token.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        css += `--color-${tokenName}: ${token.value};`;
        
        // Add semantic color mappings
        if (tokenName.includes('success')) {
          css += `--color-success: ${token.value};`;
        } else if (tokenName.includes('error') || tokenName.includes('danger')) {
          css += `--color-error: ${token.value};`;
        } else if (tokenName.includes('warning')) {
          css += `--color-warning: ${token.value};`;
        } else if (tokenName.includes('info')) {
          css += `--color-info: ${token.value};`;
        } else if (tokenName.includes('primary')) {
          css += `--color-primary: ${token.value};`;
        } else if (tokenName.includes('secondary')) {
          css += `--color-secondary: ${token.value};`;
        }
      } else if (token.type === 'spacing') {
        const tokenName = token.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        css += `--spacing-${tokenName}: ${token.value}px;`;
      } else if (token.type === 'typography') {
        const tokenName = token.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        css += `--font-size-${tokenName}: ${token.value}px;`;
      } else if (token.type === 'borderRadius') {
        const tokenName = token.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        css += `--border-radius-${tokenName}: ${token.value}px;`;
      }
    });
    
    return ':root {' + css + '}';
  }

  isClickableElement(node) {
    // Check if element is likely clickable
    const clickableTypes = ['RECTANGLE', 'FRAME', 'INSTANCE', 'GROUP'];
    const clickableNames = ['button', 'btn', 'link', 'nav', 'menu', 'tab'];
    
    const isClickableType = clickableTypes.includes(node.type);
    const hasClickableName = node.name && clickableNames.some(keyword => 
      node.name.toLowerCase().includes(keyword)
    );
    
    return isClickableType || hasClickableName;
  }

  isNavigationElement(node) {
    // Check if element is navigation-related
    const navKeywords = ['nav', 'menu', 'tab', 'link', 'button', 'btn'];
    return node.name && navKeywords.some(keyword => 
      node.name.toLowerCase().includes(keyword)
    );
  }

  isIndividualPage(node) {
    // Check if this is an individual page/screenshot within a container
    if (node.type === 'FRAME') {
      // More specific detection for individual pages
      const containerKeywords = ['container', 'group', 'screenshots', 'sitemap', 'canvas', 'symbols'];
      
      const isContainer = containerKeywords.some(keyword => 
        node.name.toLowerCase().includes(keyword)
      );
      
      // Check if it has reasonable dimensions for a page (mobile/desktop size)
      const hasReasonableSize = node.absoluteBoundingBox && 
                               node.absoluteBoundingBox.width >= 150 && 
                               node.absoluteBoundingBox.height >= 200;
      
      // Check if it has substantial content (not just empty frames)
      const hasContent = node.children && Array.isArray(node.children) && node.children.length >= 1;
      
      // Check if it looks like a UI page (has navigation, buttons, etc.)
      const hasUIElements = this.hasUIElements(node);
      
      // Additional check: exclude very small frames and text-only frames
      const isNotTooSmall = node.absoluteBoundingBox && 
                           node.absoluteBoundingBox.width >= 80 && 
                           node.absoluteBoundingBox.height >= 80;
      
      // It's an individual page if:
      // 1. It's not a container
      // 2. It has reasonable size
      // 3. It has content OR UI elements
      // 4. It's not too small
      const isIndividual = !isContainer && hasReasonableSize && isNotTooSmall && (hasContent || hasUIElements);
      
      // Debug logging for Screenshots container
      if (node.name && node.name.toLowerCase().includes('screenshots')) {
        console.log(`🔍 Checking "${node.name}": container=${isContainer}, size=${hasReasonableSize}, content=${hasContent}, ui=${hasUIElements}, small=${!isNotTooSmall}, individual=${isIndividual}`);
      }
      
      return isIndividual;
    }
    return false;
  }

  hasUIElements(node) {
    // Check if the node contains UI elements like buttons, navigation, etc.
    if (!node.children || !Array.isArray(node.children)) return false;
    
    const uiKeywords = ['button', 'nav', 'menu', 'header', 'footer', 'input', 'form'];
    
    for (const child of node.children) {
      if (child.name && uiKeywords.some(keyword => child.name.toLowerCase().includes(keyword))) {
        return true;
      }
      // Recursively check children
      if (this.hasUIElements(child)) {
        return true;
      }
    }
    return false;
  }

  async generateAngularComponent(componentId, outputPath) {
    try {
      console.log(`⚡ Generating Angular component for: ${componentId}`);
      
      let component = null;
      let componentName = `Component${componentId.replace(/[^a-zA-Z0-9]/g, '')}`;
      
      // Try to get component from Figma if connected
      if (this.figmaToken && this.fileId) {
        try {
          const file = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
          
          if (file && file.document) {
            component = this.findComponentById(file.document, componentId);
            
            if (component) {
              componentName = this.sanitizeComponentName(component.name);
            }
          }
        } catch (figmaError) {
          console.log('⚠️ Figma connection failed, using demo component:', figmaError.message);
        }
      }
      
      // If no component found or no Figma connection, create a demo component
      if (!component) {
        console.log('🎭 Creating demo component for:', componentId);
        component = {
          id: componentId,
          name: componentName,
          type: 'COMPONENT',
          fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.6, b: 1, a: 1 } }],
          strokes: [],
          effects: [],
          cornerRadius: 8,
          width: 200,
          height: 100
        };
      }

      // Generate component files
      componentName = this.sanitizeComponentName(component.name);
      const files = this.createAngularComponentFiles(component, componentName);
      
      // Create the component directory
      const componentDir = `src/design-system/components/${componentName.toLowerCase()}`;
      this.ensureDirectoryExists(componentDir);
      
      // Write files
      const fs = require('fs');
      const path = require('path');
      
      const writtenFiles = [];
      
      // Write TypeScript file
      const tsPath = path.join(componentDir, `${componentName.toLowerCase()}.component.ts`);
      fs.writeFileSync(tsPath, files.typescript);
      writtenFiles.push(tsPath);
      
      // Write HTML file
      const htmlPath = path.join(componentDir, `${componentName.toLowerCase()}.component.html`);
      fs.writeFileSync(htmlPath, files.html);
      writtenFiles.push(htmlPath);
      
      // Write SCSS file
      const scssPath = path.join(componentDir, `${componentName.toLowerCase()}.component.scss`);
      fs.writeFileSync(scssPath, files.scss);
      writtenFiles.push(scssPath);
      
      console.log(`✅ Generated component files:`, writtenFiles);
      
      return {
        id: componentId,
        name: componentName,
        files: writtenFiles,
        component: {
          name: component.name,
          type: component.type,
          variants: this.extractVariants(component),
          properties: this.extractProperties(component)
        }
      };
    } catch (error) {
      console.error(`❌ Failed to generate component ${componentId}:`, error);
      throw error;
    }
  }

  async generateAngularPage(pageId) {
    try {
      console.log(`⚡ Generating Angular page for: ${pageId}`);
      
      let page = null;
      let pageName = `Page${pageId.replace(/[^a-zA-Z0-9]/g, '')}`;
      
      // Try to get page from Figma if connected
      if (this.figmaToken && this.fileId) {
        try {
          const file = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
          
          if (file && file.document) {
            page = this.findPageById(file.document, pageId);
            
            if (page) {
              pageName = this.sanitizeComponentName(page.name);
            }
          }
        } catch (figmaError) {
          console.log('⚠️ Figma connection failed, using demo page:', figmaError.message);
        }
      }
      
      // If no page found or no Figma connection, create a demo page
      if (!page) {
        console.log('🎭 Creating demo page for:', pageId);
        page = {
          id: pageId,
          name: pageName,
          type: 'PAGE',
          children: [],
          fills: [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95, a: 1 } }],
          width: 1200,
          height: 800
        };
      }

      // Generate page files
      pageName = this.sanitizeComponentName(page.name);
      const files = this.createAngularPageFiles(page, pageName);
      
      // Create the page directory
      const pageDir = `src/pages/${pageName.toLowerCase()}`;
      this.ensureDirectoryExists(pageDir);
      
      // Write files
      const fs = require('fs');
      const path = require('path');
      
      const writtenFiles = [];
      
      // Write TypeScript file
      const tsPath = path.join(pageDir, `${pageName.toLowerCase()}.component.ts`);
      fs.writeFileSync(tsPath, files.typescript);
      writtenFiles.push(tsPath);
      
      // Write HTML file
      const htmlPath = path.join(pageDir, `${pageName.toLowerCase()}.component.html`);
      fs.writeFileSync(htmlPath, files.html);
      writtenFiles.push(htmlPath);
      
      // Write SCSS file
      const scssPath = path.join(pageDir, `${pageName.toLowerCase()}.component.scss`);
      fs.writeFileSync(scssPath, files.scss);
      writtenFiles.push(scssPath);
      
      console.log(`✅ Generated page files:`, writtenFiles);
      
      return {
        id: pageId,
        name: pageName,
        files: writtenFiles,
        page: {
          name: page.name,
          children: page.children || [],
          properties: this.extractProperties(page)
        }
      };
    } catch (error) {
      console.error(`❌ Failed to generate page ${pageId}:`, error);
      throw error;
    }
  }

  findComponentById(node, componentId) {
    // Check if node exists and has an id property
    if (!node || !node.id) {
      return null;
    }
    
    if (node.id === componentId) {
      return node;
    }
    
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        const found = this.findComponentById(child, componentId);
        if (found) return found;
      }
    }
    
    return null;
  }

  findPageById(node, pageId) {
    if (node.id === pageId) {
      return node;
    }
    
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        const found = this.findPageById(child, pageId);
        if (found) return found;
      }
    }
    
    return null;
  }

  sanitizeComponentName(name) {
    // Convert "Button/Primary" to "ButtonPrimary"
    return name.replace(/[^a-zA-Z0-9]/g, '');
  }

  createAngularComponentFiles(component, componentName) {
    const variants = this.extractVariants(component);
    const properties = this.extractProperties(component);
    
    // Generate TypeScript
    const typescript = `import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-${componentName.toLowerCase()}',
  templateUrl: './${componentName.toLowerCase()}.component.html',
  styleUrls: ['./${componentName.toLowerCase()}.component.scss']
})
export class ${componentName}Component {
  @Input() variant: '${variants.join("' | '")}' = '${variants[0] || 'default'}';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Component properties extracted from Figma
  readonly componentData = {
    name: '${component.name}',
    type: '${component.type}',
    variants: ${JSON.stringify(variants, null, 2)},
    properties: ${JSON.stringify(properties, null, 2)}
  };
}`;

    // Generate HTML
    const html = `<div class="ds-${componentName.toLowerCase()}" [class]="'variant-' + variant">
  <ng-content></ng-content>
</div>`;

    // Generate SCSS
    const scss = `// Generated from Figma component: ${component.name}
.ds-${componentName.toLowerCase()} {
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  // Variants
  ${variants.map(variant => `
  &.variant-${variant} {
    // ${variant} variant styles
  }`).join('')}
  
  // States
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &.loading {
    position: relative;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

    return { typescript, html, scss };
  }

  createAngularPageFiles(page, pageName) {
    const children = [];
    this.traverseNodesForComponentsAndPages(page.children, children);

    // Generate TypeScript
    const typescript = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${pageName.toLowerCase()}',
  templateUrl: './${pageName.toLowerCase()}.component.html',
  styleUrls: ['./${pageName.toLowerCase()}.component.scss']
})
export class ${pageName}Component {
  // Page properties extracted from Figma
  readonly pageData = {
    name: '${page.name}',
    children: ${JSON.stringify(children, null, 2)}
  };
}`;

    // Generate HTML
    const html = `<div class="app-${pageName.toLowerCase()}">
  <ng-content></ng-content>
</div>`;

    // Generate SCSS
    const scss = `// Generated from Figma page: ${page.name}
.app-${pageName.toLowerCase()} {
  // Base styles
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  // States
  &.loading {
    position: relative;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

    return { typescript, html, scss };
  }

  traverseNodesForComponentsAndPages(nodes, result) {
    nodes.forEach(node => {
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        result.push({
          id: node.id,
          name: node.name,
          type: node.type,
          variants: this.extractVariants(node),
          properties: this.extractProperties(node)
        });
      } else if (node.type === 'PAGE') {
        result.push({
          id: node.id,
          name: node.name,
          type: node.type,
          children: node.children || [],
          properties: this.extractProperties(node)
        });
      } else if (node.children && Array.isArray(node.children)) {
        this.traverseNodesForComponentsAndPages(node.children, result);
      }
    });
  }

  ensureDirectoryExists(dirPath) {
    const fs = require('fs');
    const path = require('path');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  generateCssVariables(tokens) {
    let css = '/* Design System Tokens - Generated from Figma */\n';
    css += ':root {\n';

    tokens.forEach(token => {
      switch (token.type) {
        case 'color':
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}: ${token.value};\n`;
          break;
        case 'typography':
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}-font-family: ${token.value.fontFamily};\n`;
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}-font-size: ${token.value.fontSize};\n`;
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}-font-weight: ${token.value.fontWeight};\n`;
          break;
        case 'spacing':
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}: ${token.value.padding};\n`;
          break;
        case 'borderRadius':
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}: ${token.value};\n`;
          break;
        case 'shadow':
          css += `  --ds-${token.name.toLowerCase().replace(/\s+/g, '-')}: ${token.value};\n`;
          break;
      }
    });

    css += '}\n';
    return css;
  }

  startWatching() {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
    }

    this.watchInterval = setInterval(async () => {
      try {
        const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
        if (file.version !== this.lastFileVersion) {
          console.log('🔄 Figma file changed, triggering sync...');
          this.lastFileVersion = file.version;
          // Emit change event (in real implementation, use WebSockets)
        }
      } catch (error) {
        console.error('Error watching Figma file:', error);
      }
    }, 30000); // Check every 30 seconds
  }

  stopWatching() {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
      this.watchInterval = null;
    }
  }

  // Auto-sync methods
  startAutoSync() {
    if (this.autoSyncInterval) {
      console.log(`🤖 Starting auto-sync with ${this.autoSyncInterval}ms interval`);
      this.stopAutoSync(); // Clear any existing interval
      
      this.autoSyncInterval = setInterval(async () => {
        await this.performAutoSync();
      }, this.autoSyncInterval);
    }
  }

  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
      console.log('⏸️ Auto-sync stopped');
    }
  }

  async performAutoSync() {
    if (this.isSyncing) {
      console.log('⚠️ Skipping auto-sync - manual sync in progress');
      return;
    }

    if (!this.canMakeApiCall()) {
      console.log('⚠️ Skipping auto-sync - API rate limit reached');
      return;
    }

    try {
      console.log('🤖 Performing auto-sync...');
      this.lastAutoSync = new Date().toISOString();
      this.autoSyncError = null;
      
      // Check if we should do delta sync or full sync
      const shouldDoDeltaSync = this.cachedPages && this.cachedPages.length > 0;
      
      if (shouldDoDeltaSync) {
        console.log('🔄 Performing delta sync (only changed items)...');
        await this.performDeltaSync();
      } else {
        console.log('🔄 Performing full sync (no cached data)...');
        await this.startServerSideSync('full');
      }
      
      console.log('✅ Auto-sync completed successfully');
    } catch (error) {
      console.error('❌ Auto-sync failed:', error);
      this.autoSyncError = error.message;
    }
  }
  
  async performDeltaSync() {
    try {
      console.log('🔄 Starting delta sync...');
      
      // Get current file info from Figma
      const fileInfo = await this.makeFigmaRequestWithRateLimit('/files/' + this.figmaFileId);
      if (!fileInfo || !fileInfo.lastModified) {
        console.log('⚠️ Could not get file info, falling back to full sync');
        await this.startServerSideSync('full');
        return;
      }
      
      const lastModified = new Date(fileInfo.lastModified);
      const lastSyncTime = this.getLastSyncTime();
      
      console.log(`📅 Last sync: ${lastSyncTime}`);
      console.log(`📅 File modified: ${lastModified}`);
      
      // Check if file has been modified since last sync
      if (lastSyncTime && lastModified <= lastSyncTime) {
        console.log('✅ No changes detected, skipping sync');
        return;
      }
      
      console.log('🔄 Changes detected, performing delta sync...');
      
      // For now, we'll do a full sync but in the future we can implement
      // more granular delta sync by comparing individual nodes
      await this.startServerSideSync('delta');
      
      // Update last sync time
      this.updateLastSyncTime();
      
    } catch (error) {
      console.error('❌ Delta sync failed:', error);
      // Fallback to full sync
      await this.startServerSideSync('full');
    }
  }
  
  getLastSyncTime() {
    try {
      const metadata = JSON.parse(fs.readFileSync(path.join(this.storageDir, 'sync-metadata.json'), 'utf8'));
      return metadata.lastSyncTime ? new Date(metadata.lastSyncTime) : null;
    } catch (error) {
      return null;
    }
  }
  
  updateLastSyncTime() {
    try {
      const metadata = {
        lastSyncTime: new Date().toISOString(),
        syncType: 'delta'
      };
      fs.writeFileSync(path.join(this.storageDir, 'sync-metadata.json'), JSON.stringify(metadata, null, 2));
    } catch (error) {
      console.error('❌ Failed to update sync metadata:', error);
    }
  }

  canMakeApiCall() {
    const now = Date.now();
    const hourAgo = now - 3600000; // 1 hour in milliseconds
    
    // Reset counter if an hour has passed
    if (now - this.lastApiReset > 3600000) {
      this.apiCallsThisHour = 0;
      this.lastApiReset = now;
      this.saveApiCallTracking(); // Save the reset
    }
    
    return this.apiCallsThisHour < this.maxApiCallsPerHour;
  }

  trackApiCall() {
    this.apiCallsThisHour++;
    console.log(`📊 API calls this hour: ${this.apiCallsThisHour}/${this.maxApiCallsPerHour}`);
    this.saveApiCallTracking();
  }

  loadApiCallTracking() {
    try {
      const apiTrackingFile = path.join(this.storageDir, 'api-tracking.json');
      if (fs.existsSync(apiTrackingFile)) {
        const tracking = JSON.parse(fs.readFileSync(apiTrackingFile, 'utf8'));
        const now = Date.now();
        const hourAgo = now - 3600000; // 1 hour in milliseconds
        
        // Check if the tracking is still valid (within the last hour)
        if (tracking.lastApiReset > hourAgo) {
          this.apiCallsThisHour = tracking.apiCallsThisHour || 0;
          this.lastApiReset = tracking.lastApiReset;
          console.log(`📊 Loaded API tracking: ${this.apiCallsThisHour} calls this hour`);
        } else {
          // Reset if more than an hour has passed
          this.apiCallsThisHour = 0;
          this.lastApiReset = now;
          console.log('🔄 API tracking reset (hour expired)');
        }
      } else {
        console.log('📊 No previous API tracking found, starting fresh');
      }
    } catch (error) {
      console.error('❌ Error loading API tracking:', error);
      this.apiCallsThisHour = 0;
      this.lastApiReset = Date.now();
    }
  }

  saveApiCallTracking() {
    try {
      const apiTrackingFile = path.join(this.storageDir, 'api-tracking.json');
      const tracking = {
        apiCallsThisHour: this.apiCallsThisHour,
        lastApiReset: this.lastApiReset,
        maxApiCallsPerHour: this.maxApiCallsPerHour,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(apiTrackingFile, JSON.stringify(tracking, null, 2));
    } catch (error) {
      console.error('❌ Error saving API tracking:', error);
    }
  }

  isCacheExpired() {
    if (!this.lastSyncTime) {
      return true; // No cache exists
    }
    
    const now = Date.now();
    const lastSync = Date.parse(this.lastSyncTime);
    const cacheAge = now - lastSync;
    
    return cacheAge > this.cacheValidDuration;
  }

  async makeFigmaRequestWithRetry(endpoint, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (!this.canMakeApiCall()) {
          throw new Error('API rate limit reached');
        }
        
        this.trackApiCall();
        const result = await this.makeFigmaRequest(endpoint);
        return result;
      } catch (error) {
        lastError = error;
        console.log(`⚠️ API request failed (attempt ${attempt}/${maxRetries}):`, error.message);
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }

  rgbaToHex(r, g, b, a = 1) {
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  formatShadow(effect) {
    const { offset, radius, color } = effect;
    const { r, g, b, a } = color;
    const rgba = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
    return `${offset.x}px ${offset.y}px ${radius}px ${rgba}`;
  }

  /**
   * Start server-side sync process
   */
  async startServerSideSync(syncType = 'full') {
    if (this.isSyncing) {
      console.log('⚠️ Sync already in progress');
      return;
    }

    this.isSyncing = true;
    this.syncProgress = 0;
    this.syncError = null;
    this.syncDetails = {
      phase: 'Starting',
      current: 0,
      total: 0,
      message: 'Initializing sync...'
    };

    try {
      console.log(`🔄 Starting ${syncType} sync from Figma...`);
      
      // Check if we should do delta sync
      const shouldDeltaSync = syncType === 'delta' && this.lastSyncTime && this.lastFileVersion;
      
      if (shouldDeltaSync) {
        console.log('🔄 Performing delta sync...');
        this.syncDetails.phase = 'Delta Sync';
        this.syncDetails.message = 'Checking for changes...';
        
        // Get current file version
        const fileInfo = await this.makeFigmaRequestWithRateLimit(`/files/${this.fileId}`);
        if (fileInfo.version === this.lastFileVersion) {
          console.log('✅ No changes detected, using cached data');
          this.syncDetails.message = 'No changes detected';
          this.syncProgress = 100;
          return;
        }
        
        this.lastFileVersion = fileInfo.version;
        console.log(`🔄 File version changed from ${this.lastFileVersion} to ${fileInfo.version}`);
      }
      
      if (syncType === 'full' || syncType === 'tokens' || syncType === 'delta') {
        this.syncDetails.phase = 'Tokens';
        this.syncDetails.message = 'Extracting design tokens...';
        this.syncProgress = 10;
        console.log('📦 Syncing design tokens...');
        this.cachedTokens = await this.extractDesignTokens();
        this.syncProgress = 25;
      }

      if (syncType === 'full' || syncType === 'components' || syncType === 'delta') {
        this.syncDetails.phase = 'Components';
        this.syncDetails.message = 'Extracting components...';
        this.syncProgress = 30;
        console.log('🧩 Syncing components...');
        this.cachedComponents = await this.extractComponents();
        this.syncProgress = 50;
        
        // Generate batch previews for components
        this.syncDetails.message = 'Generating component previews...';
        this.syncProgress = 60;
        this.cachedComponents = await this.generateBatchPreviews(this.cachedComponents, 'component');
        this.syncProgress = 70;
      }

      if (syncType === 'full' || syncType === 'pages' || syncType === 'delta') {
        this.syncDetails.phase = 'Pages';
        this.syncDetails.message = 'Extracting pages...';
        this.syncProgress = 75;
        console.log('📄 Syncing pages...');
        this.cachedPages = await this.extractPages();
        this.syncProgress = 85;
        
        // Generate batch previews for pages
        this.syncDetails.message = 'Generating page previews...';
        this.syncProgress = 90;
        this.cachedPages = await this.generateBatchPreviews(this.cachedPages, 'page');
        this.syncProgress = 95;
      }

      // Save all data
      this.syncDetails.phase = 'Saving';
      this.syncDetails.message = 'Saving cached data...';
      this.saveCachedData();
      this.syncProgress = 100;
      this.lastSyncTime = new Date().toISOString();
      
      console.log('✅ Server-side sync completed successfully');
      console.log(`📊 Synced data: ${this.cachedTokens.length} tokens, ${this.cachedComponents.length} components, ${this.cachedPages.length} pages`);

    } catch (error) {
      console.error('❌ Server-side sync failed:', error);
      this.syncError = error.message;
      this.syncDetails.message = `Error: ${error.message}`;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Start enhanced sync with token and component linking
   */
  async startEnhancedSync(syncType = 'full') {
    if (this.isSyncing) {
      console.log('⚠️ Enhanced sync already in progress, skipping...');
      return;
    }

    this.isSyncing = true;
    this.syncProgress = 0;
    this.syncError = null;
    this.syncDetails = {
      phase: 'Starting Enhanced Sync',
      current: 0,
      total: 0,
      message: 'Initializing enhanced sync...'
    };

    try {
      console.log(`🔄 Starting enhanced ${syncType} sync...`);
      
      if (!this.figmaToken) {
        throw new Error('Figma connection not configured. Please set FIGMA_ACCESS_TOKEN.');
      }

      // Check if we can make API calls
      if (!this.canMakeApiCall()) {
        throw new Error('API rate limit exceeded. Please wait before making more requests.');
      }

      // Get configured files and remove duplicates
      const files = config.figma.files || [{ id: this.fileId, name: 'Design System', type: 'design-system' }];
      
      // Remove duplicate files by ID
      const uniqueFiles = files.filter((file, index, self) => 
        index === self.findIndex(f => f.id === file.id)
      );
      
      // Sort files by priority (design system first)
      uniqueFiles.sort((a, b) => (a.priority || 999) - (b.priority || 999));
      
      this.syncDetails.total = uniqueFiles.length;
      
      // Clear existing enhanced data to prevent duplicates
      this.enhancedTokens = [];
      this.enhancedComponents = [];
      this.enhancedFiles = [];
      
      // Process each file
      for (let i = 0; i < uniqueFiles.length; i++) {
        const file = uniqueFiles[i];
        this.syncDetails.current = i;
        this.syncDetails.phase = `Processing ${file.name}`;
        this.syncDetails.message = `Extracting data from ${file.name}...`;
        
        console.log(`📁 Processing file: ${file.name} (${file.type})`);
        
        try {
          // Get file data from Figma
          const fileData = await this.makeFigmaRequestWithRateLimit(`/files/${file.id}`);
          
          // Extract tokens using enhanced extractor
          if (config.figma.tokenExtraction.enabled) {
            console.log(`🎨 Extracting tokens from ${file.name}...`);
            const tokens = await this.tokenExtractor.extractTokensFromFile(file.id, fileData);
            
            // Store tokens with file reference
            if (!this.enhancedTokens) this.enhancedTokens = [];
            this.enhancedTokens.push(...tokens);
          }
          
          // Extract components using enhanced extractor
          if (config.figma.componentExtraction.enabled) {
            console.log(`🧩 Extracting components from ${file.name}...`);
            const components = await this.componentExtractor.extractComponentsFromFile(file.id, fileData);
            
            // Store components with file reference
            if (!this.enhancedComponents) this.enhancedComponents = [];
            this.enhancedComponents.push(...components);
          }
          
          // Store file data with actual name from Figma
          if (!this.enhancedFiles) this.enhancedFiles = [];
          this.enhancedFiles.push({
            id: file.id,
            name: fileData.name || file.name, // Use actual Figma file name
            type: file.type,
            description: file.description,
            priority: file.priority,
            lastModified: new Date().toISOString(),
            version: fileData.version || '',
            thumbnailUrl: fileData.thumbnailUrl || null,
            lastModifiedBy: fileData.lastModifiedBy?.name || null
          });
          
          console.log(`✅ Completed processing ${file.name}`);
          
        } catch (error) {
          console.error(`❌ Error processing file ${file.name}:`, error);
          // Continue with other files
        }
      }
      
      // Save enhanced data
      this.saveEnhancedCachedData();
      
      // Update sync metadata
      this.updateLastSyncTime();
      
      console.log('✅ Enhanced sync completed successfully');
      this.syncDetails = {
        phase: 'Enhanced Sync Completed',
        current: files.length,
        total: files.length,
        message: 'Enhanced sync completed successfully'
      };

    } catch (error) {
      console.error('❌ Enhanced sync failed:', error);
      this.syncError = error.message;
      this.syncDetails = {
        phase: 'Enhanced Sync Failed',
        current: 0,
        total: 100,
        message: `Enhanced sync failed: ${error.message}`
      };
    } finally {
      this.isSyncing = false;
      this.syncProgress = 100;
    }
  }

  /**
   * Get server storage info
   */
  getServerStorageInfo() {
    try {
      const stats = fs.statSync(this.cacheFile);
      const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
      
      return {
        cacheSize: sizeInMB + ' MB',
        tokensCount: this.cachedTokens.length,
        componentsCount: this.cachedComponents.length,
        pagesCount: this.cachedPages.length,
        lastSync: this.lastSyncTime,
        isSyncing: this.isSyncing
      };
    } catch (error) {
      return {
        cacheSize: '0 MB',
        tokensCount: 0,
        componentsCount: 0,
        pagesCount: 0,
        lastSync: null,
        isSyncing: this.isSyncing
      };
    }
  }

  /**
   * Clear server cache
   */
  clearServerCache() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        fs.unlinkSync(this.cacheFile);
      }
      if (fs.existsSync(this.metadataFile)) {
        fs.unlinkSync(this.metadataFile);
      }
      if (fs.existsSync(this.htmlPreviewCacheFile)) {
        fs.unlinkSync(this.htmlPreviewCacheFile);
      }
      
      this.cachedTokens = [];
      this.cachedComponents = [];
      this.cachedPages = [];
      this.htmlPreviewCache.clear();
      this.lastSyncTime = null;
      
      console.log('🧹 Server cache cleared');
      return true;
    } catch (error) {
      console.error('❌ Error clearing server cache:', error);
      return false;
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 MCP Figma Server running on port ${this.port}`);
      console.log(`📁 Storage directory: ${this.storageDir}`);
      console.log(`🔗 API endpoints available at http://localhost:${this.port}/api/mcp/figma/`);
      
      // Log server storage info
      const storageInfo = this.getServerStorageInfo();
      console.log(`📊 Server storage: ${storageInfo.cacheSize}, ${storageInfo.tokensCount} tokens, ${storageInfo.componentsCount} components`);
    });
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  const server = new McpFigmaServer();
  server.start();
}

module.exports = McpFigmaServer; 