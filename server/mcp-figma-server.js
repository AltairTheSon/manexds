const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

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
    
    // Sync state tracking
    this.isSyncing = false;
    this.syncProgress = 0;
    this.syncError = null;
    this.lastSyncTime = null;
    
    // Local storage paths
    this.storageDir = path.join(__dirname, 'storage');
    this.cacheFile = path.join(this.storageDir, 'figma-cache.json');
    this.metadataFile = path.join(this.storageDir, 'sync-metadata.json');
    
    // Ensure storage directory exists
    this.ensureStorageDirectory();
    
    // Load cached data on startup
    this.loadCachedData();

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

    // Get sync status
    this.app.get('/api/mcp/figma/sync-status', (req, res) => {
      res.json({
        isSyncing: this.isSyncing,
        syncProgress: this.syncProgress,
        lastSyncTime: this.lastSyncTime,
        syncError: this.syncError,
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

    // Get design tokens
    this.app.get('/api/mcp/figma/tokens', async (req, res) => {
      try {
        // Return cached data if available and no Figma connection required
        if (this.cachedTokens.length > 0 && !this.figmaToken) {
          console.log('📦 Returning cached tokens:', this.cachedTokens.length);
          return res.json(this.cachedTokens);
        }
        
        const tokens = await this.extractDesignTokens();
        this.cachedTokens = tokens;
        this.saveCachedData();
        res.json(tokens);
      } catch (error) {
        console.error('Error extracting design tokens:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get components
    this.app.get('/api/mcp/figma/components', async (req, res) => {
      try {
        // Return cached data if available and no Figma connection required
        if (this.cachedComponents.length > 0 && !this.figmaToken) {
          console.log('📦 Returning cached components:', this.cachedComponents.length);
          return res.json(this.cachedComponents);
        }
        
        const components = await this.extractComponents();
        this.cachedComponents = components;
        this.saveCachedData();
        res.json(components);
      } catch (error) {
        console.error('Error extracting components:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Get pages
    this.app.get('/api/mcp/figma/pages', async (req, res) => {
      try {
        // Return cached data if available and no Figma connection required
        if (this.cachedPages.length > 0 && !this.figmaToken) {
          console.log('📦 Returning cached pages:', this.cachedPages.length);
          return res.json(this.cachedPages);
        }
        
        const pages = await this.extractPages();
        this.cachedPages = pages;
        this.saveCachedData();
        res.json(pages);
      } catch (error) {
        console.error('Error extracting pages:', error);
        res.status(500).json({ error: error.message });
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

        // If no Figma connection, return demo data
        if (!this.figmaToken || !this.fileId) {
          console.log('🎭 Returning demo data (no Figma connection)');
          
          // Return demo data for testing
          const demoData = {
            tokens: [
              {
                id: 'demo-color-primary',
                name: 'Primary Color',
                type: 'color',
                value: '#3b82f6',
                description: 'Primary brand color'
              },
              {
                id: 'demo-color-secondary',
                name: 'Secondary Color',
                type: 'color',
                value: '#6b7280',
                description: 'Secondary brand color'
              },
              {
                id: 'demo-spacing-sm',
                name: 'Spacing Small',
                type: 'spacing',
                value: '8px',
                description: 'Small spacing unit'
              }
            ],
            components: [
              {
                id: 'demo-button',
                name: 'Button',
                type: 'component',
                variants: ['primary', 'secondary'],
                lastModified: new Date().toISOString()
              },
              {
                id: 'demo-card',
                name: 'Card',
                type: 'component',
                variants: ['default', 'elevated'],
                lastModified: new Date().toISOString()
              }
            ],
            pages: [
              {
                id: 'demo-page-1',
                name: 'Home Page',
                type: 'page',
                lastModified: new Date().toISOString()
              }
            ]
          };

          res.json(demoData);
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

  async extractDesignTokens() {
    if (!this.figmaToken || !this.fileId) {
      console.log('🎭 Returning demo design tokens (no Figma connection)');
      return [
        {
          id: 'demo-color-primary',
          name: 'Primary Color',
          type: 'color',
          value: '#3b82f6',
          description: 'Primary brand color'
        },
        {
          id: 'demo-color-secondary',
          name: 'Secondary Color',
          type: 'color',
          value: '#6b7280',
          description: 'Secondary brand color'
        },
        {
          id: 'demo-color-success',
          name: 'Success Color',
          type: 'color',
          value: '#10b981',
          description: 'Success state color'
        },
        {
          id: 'demo-color-error',
          name: 'Error Color',
          type: 'color',
          value: '#ef4444',
          description: 'Error state color'
        },
        {
          id: 'demo-spacing-xs',
          name: 'Spacing XS',
          type: 'spacing',
          value: '4px',
          description: 'Extra small spacing'
        },
        {
          id: 'demo-spacing-sm',
          name: 'Spacing Small',
          type: 'spacing',
          value: '8px',
          description: 'Small spacing unit'
        },
        {
          id: 'demo-spacing-md',
          name: 'Spacing Medium',
          type: 'spacing',
          value: '16px',
          description: 'Medium spacing unit'
        },
        {
          id: 'demo-spacing-lg',
          name: 'Spacing Large',
          type: 'spacing',
          value: '24px',
          description: 'Large spacing unit'
        },
        {
          id: 'demo-typography-heading',
          name: 'Heading Typography',
          type: 'typography',
          value: {
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: '600'
          },
          description: 'Heading typography style'
        },
        {
          id: 'demo-typography-body',
          name: 'Body Typography',
          type: 'typography',
          value: {
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '400'
          },
          description: 'Body text typography style'
        }
      ];
    }

    const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
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
      console.log('🎭 Returning demo components (no Figma connection)');
      return [
        {
          id: 'demo-button',
          name: 'Button',
          type: 'component',
          variants: ['primary', 'secondary', 'outline'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-card',
          name: 'Card',
          type: 'component',
          variants: ['default', 'elevated', 'outlined'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-input',
          name: 'Input',
          type: 'component',
          variants: ['default', 'error', 'success'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-modal',
          name: 'Modal',
          type: 'component',
          variants: ['default', 'large', 'small'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-navigation',
          name: 'Navigation',
          type: 'component',
          variants: ['horizontal', 'vertical'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-avatar',
          name: 'Avatar',
          type: 'component',
          variants: ['circle', 'square', 'large', 'small'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-badge',
          name: 'Badge',
          type: 'component',
          variants: ['default', 'success', 'warning', 'error'],
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-tooltip',
          name: 'Tooltip',
          type: 'component',
          variants: ['top', 'bottom', 'left', 'right'],
          lastModified: new Date().toISOString()
        }
      ];
    }

    const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
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
      // Generate preview image URL for the component
      let previewUrl = null;
      try {
        console.log(`🖼️ Generating preview for component: ${node.name} (${node.id})`);
        const imageResponse = await this.makeFigmaRequest(`/images/${this.fileId}?ids=${node.id}&format=png&scale=1`);
        console.log(`📸 Image response for ${node.name}:`, JSON.stringify(imageResponse, null, 2));
        if (imageResponse.images && imageResponse.images[node.id]) {
          previewUrl = imageResponse.images[node.id];
          console.log(`✅ Preview generated for ${node.name}: ${previewUrl}`);
        } else {
          console.log(`⚠️ No image URL found for component ${node.name}`);
        }
      } catch (error) {
        console.log(`❌ Could not generate preview for component ${node.name}:`, error.message);
      }

      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        variants: this.extractVariants(node),
        properties: this.extractProperties(node),
        preview: previewUrl,
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
      console.log('🎭 Returning demo pages (no Figma connection)');
      return [
        {
          id: 'demo-page-home',
          name: 'Home Page',
          type: 'page',
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-page-about',
          name: 'About Page',
          type: 'page',
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-page-contact',
          name: 'Contact Page',
          type: 'page',
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-page-dashboard',
          name: 'Dashboard',
          type: 'page',
          lastModified: new Date().toISOString()
        },
        {
          id: 'demo-page-settings',
          name: 'Settings',
          type: 'page',
          lastModified: new Date().toISOString()
        }
      ];
    }

    const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
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
          // Generate preview image URL for the page
          let previewUrl = null;
          try {
            console.log(`🖼️ Generating preview for page: ${page.name} (${page.id})`);
            const imageResponse = await this.makeFigmaRequest(`/images/${this.fileId}?ids=${page.id}&format=png&scale=1`);
            console.log(`📸 Image response for page ${page.name}:`, JSON.stringify(imageResponse, null, 2));
            if (imageResponse.images && imageResponse.images[page.id]) {
              previewUrl = imageResponse.images[page.id];
              console.log(`✅ Preview generated for page ${page.name}: ${previewUrl}`);
            } else {
              console.log(`⚠️ No image URL found for page ${page.name}`);
            }
          } catch (error) {
            console.log(`❌ Could not generate preview for page ${page.name}:`, error.message);
          }

          pages.push({
            id: page.id,
            name: page.name,
            children: page.children || [],
            preview: previewUrl,
            lastModified: new Date().toISOString()
          });
        }
      }
    } else {
      console.log('⚠️ No children found in root node for page extraction');
    }
    
    console.log(`📄 Extracted ${pages.length} pages`);
    return pages;
  }

  async generateAngularComponent(componentId, outputPath) {
    try {
      console.log(`⚡ Generating Angular component for: ${componentId}`);
      
      let component = null;
      let componentName = `Component${componentId.replace(/[^a-zA-Z0-9]/g, '')}`;
      
      // Try to get component from Figma if connected
      if (this.figmaToken && this.fileId) {
        try {
          const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
          
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
          const file = await this.makeFigmaRequest(`/files/${this.fileId}`);
          
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

    try {
      console.log(`🔄 Starting ${syncType} sync from Figma...`);
      
      if (syncType === 'full' || syncType === 'tokens') {
        this.syncProgress = 10;
        console.log('📦 Syncing design tokens...');
        this.cachedTokens = await this.extractDesignTokens();
        this.syncProgress = 40;
      }

      if (syncType === 'full' || syncType === 'components') {
        console.log('🧩 Syncing components...');
        this.cachedComponents = await this.extractComponents();
        this.syncProgress = 70;
      }

      if (syncType === 'full' || syncType === 'pages') {
        console.log('📄 Syncing pages...');
        this.cachedPages = await this.extractPages();
        this.syncProgress = 90;
      }

      // Save all data
      this.saveCachedData();
      this.syncProgress = 100;
      this.lastSyncTime = new Date().toISOString();
      
      console.log('✅ Server-side sync completed successfully');
      console.log(`📊 Synced data: ${this.cachedTokens.length} tokens, ${this.cachedComponents.length} components, ${this.cachedPages.length} pages`);

    } catch (error) {
      console.error('❌ Server-side sync failed:', error);
      this.syncError = error.message;
    } finally {
      this.isSyncing = false;
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
      
      this.cachedTokens = [];
      this.cachedComponents = [];
      this.cachedPages = [];
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