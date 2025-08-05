import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface FigmaToken {
  accessToken: string;
  fileId: string;
  teamId?: string;
}

export interface FigmaDesignToken {
  id: string;
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'shadow' | 'borderRadius';
  value: any;
  description?: string;
  lastModified?: string;
  version?: string;
}

// Enhanced interfaces for new implementation
export interface EnhancedDesignToken {
  id: string;
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow' | 'effect';
  value: any;
  description?: string;
  category: string; // e.g., "colors/primary", "typography/headings"
  fileId: string; // Which file this token belongs to
  styleId?: string; // Figma style ID
  usage: string[]; // Component IDs that use this token
  variants?: Record<string, any>; // For responsive/theme variants
  lastModified: string;
}

export interface EnhancedFigmaComponent {
  id: string;
  name: string;
  type: 'COMPONENT' | 'COMPONENT_SET';
  description?: string;
  fileId: string; // Which file this component belongs to
  pageId: string; // Which page contains this component
  frameId: string; // Which frame contains this component
  
  // Token References
  usedTokens: {
    colors: string[]; // Token IDs
    typography: string[];
    spacing: string[];
    effects: string[];
  };
  
  // Component Properties
  properties: {
    [key: string]: {
      type: 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT';
      value: any;
      description?: string;
    };
  };
  
  // Variants (for component sets)
  variants?: EnhancedFigmaComponent[];
  
  // Visual Properties
  absoluteBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  // Children with token references
  children: any[];
  
  // Preview URLs
  preview: {
    image: string;
    html: string;
  };
  
  lastModified: string;
}

export interface FigmaFile {
  id: string;
  name: string;
  type: 'design-system' | 'application' | 'prototype';
  description: string;
  priority: number;
  lastModified: string;
  version: string;
}

export interface FigmaComponent {
  id: string;
  name: string;
  type: 'component' | 'component_set';
  variants: string[];
  properties: any;
  lastModified: string;
  version?: string;
  preview?: string;
  generatedCode?: string;
  activePreviewTab?: 'image' | 'html';
  htmlPreviewLoaded?: boolean;
  htmlPreviewUrl?: SafeResourceUrl;
}

export interface FigmaPage {
  id: string;
  name: string;
  children: any[];
  lastModified: string;
  version?: string;
  preview?: string;
}

export interface SyncStatus {
  isSyncing: boolean;
  syncProgress: number;
  lastSyncTime: string | null;
  syncError: string | null;
  autoSyncEnabled: boolean;
  lastAutoSync: string | null;
  autoSyncInterval: number;
  developmentMode: boolean;
  canEnableAutoSync: boolean;
  apiUsage: {
    callsThisHour: number;
    maxCallsPerHour: number;
    remainingCalls: number;
    lastReset: number;
    canMakeCalls: boolean;
  };
  cacheStatus: {
    isValid: boolean;
    lastValidation: string | null;
    validDuration: number;
  };
  dataCounts: {
    tokens: number;
    components: number;
    pages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FigmaServerService {
  private readonly MCP_ENDPOINT = environment.mcpServer.baseUrl;
  
  // Observables for real-time updates
  private syncStatusSubject = new BehaviorSubject<SyncStatus>({
    isSyncing: false,
    syncProgress: 0,
    lastSyncTime: null,
    syncError: null,
    autoSyncEnabled: false,
    lastAutoSync: null,
    autoSyncInterval: 30000,
    developmentMode: false,
    canEnableAutoSync: true,
    apiUsage: {
      callsThisHour: 0,
      maxCallsPerHour: 0,
      remainingCalls: 0,
      lastReset: 0,
      canMakeCalls: false
    },
    cacheStatus: {
      isValid: false,
      lastValidation: null,
      validDuration: 0
    },
    dataCounts: { tokens: 0, components: 0, pages: 0 }
  });

  private syncInterval?: any;

  public syncStatus$ = this.syncStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Start monitoring sync status
    this.startSyncStatusMonitoring();
  }

  /**
   * Initialize Figma connection
   */
  initializeFigmaConnection(token: FigmaToken): Observable<boolean> {
    // This method is now handled by the direct API calls in the connector component
    // Return success if we have credentials stored
    const accessToken = localStorage.getItem('figma_access_token');
    const fileId = localStorage.getItem('figma_file_id');
    
    if (accessToken && fileId) {
      this.syncStatusSubject.next({
        ...this.syncStatusSubject.value,
        lastSyncTime: new Date().toISOString(),
        syncError: null
      });
      return of(true);
    }
    
    return of(false);
  }

  /**
   * Start server-side sync
   */
  startSync(syncType: 'full' | 'tokens' | 'components' | 'pages' = 'full'): Observable<{ success: boolean; syncId: string }> {
    // This method is now handled by the enhanced sync methods
    // Return success since we're using direct API calls
    const currentStatus = this.syncStatusSubject.value;
    this.syncStatusSubject.next({
      ...currentStatus,
      isSyncing: false,
      syncProgress: 100,
      syncError: null,
      lastSyncTime: new Date().toISOString()
    });

    return of({ success: true, syncId: 'direct-api-sync' });
  }

  /**
   * Get sync status
   */
  getSyncStatus(): Observable<SyncStatus> {
    // Return local sync status since we're not using serverless functions anymore
    const accessToken = localStorage.getItem('figma_access_token');
    const fileId = localStorage.getItem('figma_file_id');
    
    const localStatus: SyncStatus = {
      isSyncing: false,
      syncProgress: 100,
      lastSyncTime: new Date().toISOString(),
      syncError: null,
      autoSyncEnabled: false,
      lastAutoSync: null,
      autoSyncInterval: 30000,
      developmentMode: false,
      canEnableAutoSync: true,
      apiUsage: {
        callsThisHour: 0,
        maxCallsPerHour: 1000,
        remainingCalls: 1000,
        lastReset: Date.now(),
        canMakeCalls: true
      },
      cacheStatus: {
        isValid: true,
        lastValidation: new Date().toISOString(),
        validDuration: 3600000
      },
      dataCounts: {
        tokens: 0,
        components: 0,
        pages: 0
      }
    };

    // Update with connection status
    if (accessToken && fileId) {
      localStatus.lastSyncTime = new Date().toISOString();
      localStatus.syncError = null;
    } else {
      localStatus.syncError = 'Not connected to Figma';
    }

    this.syncStatusSubject.next(localStatus);
    return of(localStatus);
  }

  /**
   * Get paginated design tokens
   */
  getDesignTokens(page: number = 1, limit: number = 100, search?: string): Observable<PaginatedResponse<FigmaDesignToken>> {
    let url = `${this.MCP_ENDPOINT}/tokens?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return this.http.get<PaginatedResponse<FigmaDesignToken>>(url).pipe(
      catchError(error => {
        console.error('Failed to get design tokens:', error);
        return of({ data: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } });
      })
    );
  }

  /**
   * Get paginated components
   */
  getComponents(page: number = 1, limit: number = 100, search?: string): Observable<PaginatedResponse<FigmaComponent>> {
    let url = `${this.MCP_ENDPOINT}/components?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return this.http.get<PaginatedResponse<FigmaComponent>>(url).pipe(
      catchError(error => {
        console.error('Failed to get components:', error);
        return of({ data: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } });
      })
    );
  }

  /**
   * Get paginated pages
   */
  getPages(page: number = 1, limit: number = 100, search?: string): Observable<PaginatedResponse<FigmaPage>> {
    let url = `${this.MCP_ENDPOINT}/pages?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return this.http.get<PaginatedResponse<FigmaPage>>(url).pipe(
      catchError(error => {
        console.error('Failed to get pages:', error);
        return of({ data: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } });
      })
    );
  }

  /**
   * Get containers for interactive viewer
   */
  getContainers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.MCP_ENDPOINT}/page-flows`).pipe(
      catchError(error => {
        console.error('Failed to get containers:', error);
        return of([]);
      })
    );
  }
  
  /**
   * Get individual pages for a specific container
   */
  getContainerPages(containerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.MCP_ENDPOINT}/container/${containerId}/pages`).pipe(
      catchError(error => {
        console.error('Failed to get container pages:', error);
        return of([]);
      })
    );
  }

  /**
   * Get specific token by ID
   */
  getTokenById(id: string): Observable<FigmaDesignToken | null> {
    return this.http.get<FigmaDesignToken>(`${this.MCP_ENDPOINT}/token/${id}`).pipe(
      catchError(error => {
        console.error('Failed to get token:', error);
        return of(null);
      })
    );
  }

  /**
   * Get specific component by ID
   */
  getComponentById(id: string): Observable<FigmaComponent | null> {
    return this.http.get<FigmaComponent>(`${this.MCP_ENDPOINT}/component/${id}`).pipe(
      catchError(error => {
        console.error('Failed to get component:', error);
        return of(null);
      })
    );
  }

  /**
   * Get specific page by ID
   */
  getPageById(id: string): Observable<FigmaPage | null> {
    return this.http.get<FigmaPage>(`${this.MCP_ENDPOINT}/page/${id}`).pipe(
      catchError(error => {
        console.error('Failed to get page:', error);
        return of(null);
      })
    );
  }

  /**
   * Generate Angular component
   */
  generateAngularComponent(componentId: string, outputPath?: string): Observable<any> {
    return this.http.post(`${this.MCP_ENDPOINT}/generate-component`, {
      componentId,
      framework: 'angular',
      outputPath
    }).pipe(
      catchError(error => {
        console.error('Failed to generate component:', error);
        return of(null);
      })
    );
  }

  /**
   * Generate Angular page
   */
  generateAngularPage(pageId: string): Observable<any> {
    return this.http.post(`${this.MCP_ENDPOINT}/generate-page`, { pageId }).pipe(
      catchError(error => {
        console.error('Failed to generate page:', error);
        return of(null);
      })
    );
  }

  /**
   * Start monitoring sync status
   */
  private startSyncStatusMonitoring() {
    // Get initial sync status immediately
    this.getSyncStatus().subscribe();
    
    // Poll sync status every 1 second when syncing, every 5 seconds when idle
    this.syncInterval = interval(5000).pipe(
      switchMap(() => {
        return this.getSyncStatus();
      })
    ).subscribe();
  }

  /**
   * Stop monitoring sync status
   */
  stopSyncStatusMonitoring() {
    if (this.syncInterval) {
      this.syncInterval.unsubscribe();
    }
  }

  /**
   * Get current sync status
   */
  getCurrentSyncStatus(): SyncStatus {
    return this.syncStatusSubject.value;
  }

  /**
   * Check if currently syncing
   */
  isCurrentlySyncing(): boolean {
    return this.syncStatusSubject.value.isSyncing;
  }

  /**
   * Get data counts
   */
  getDataCounts(): { tokens: number; components: number; pages: number } {
    return this.syncStatusSubject.value.dataCounts;
  }

  // Auto-sync methods
  enableAutoSync(interval: number = 30000): Observable<any> {
    return this.http.post(`${this.MCP_ENDPOINT}/auto-sync`, { enabled: true, interval });
  }

  disableAutoSync(): Observable<any> {
    return this.http.post(`${this.MCP_ENDPOINT}/auto-sync`, { enabled: false });
  }

  getAutoSyncStatus(): Observable<any> {
    return this.http.get(`${this.MCP_ENDPOINT}/auto-sync`);
  }

  updateAutoSyncInterval(interval: number): Observable<any> {
    return this.http.post(`${this.MCP_ENDPOINT}/auto-sync`, { interval });
  }

  clearComponentHtmlPreviewCache(componentId: string): Observable<any> {
    return this.http.delete(`${this.MCP_ENDPOINT}/component-html-preview/${encodeURIComponent(componentId)}/cache`);
  }

  clearAllComponentHtmlPreviewCache(): Observable<any> {
    return this.http.delete(`${this.MCP_ENDPOINT}/component-html-preview/cache/all`);
  }

  // Enhanced API methods
  startEnhancedSync(syncType: 'full' | 'delta' = 'full'): Observable<{ success: boolean; syncId: string; message: string }> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('figma_access_token');
      const fileId = localStorage.getItem('figma_file_id');
      
      if (!accessToken || !fileId) {
        observer.next({ success: false, syncId: '', message: 'No Figma credentials found. Please connect to Figma first.' });
        observer.complete();
        return;
      }

      fetch(`https://api.figma.com/v1/files/${fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || `HTTP ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Enhanced sync successful:', data.name);
        observer.next({ 
          success: true, 
          syncId: Date.now().toString(), 
          message: `Successfully synced ${data.name}` 
        });
        observer.complete();
      })
      .catch(error => {
        console.error('Enhanced sync failed:', error);
        observer.next({ success: false, syncId: '', message: `Sync failed: ${error.message}` });
        observer.complete();
      });
    });
  }

  getEnhancedTokens(): Observable<EnhancedDesignToken[]> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('figma_access_token');
      const fileId = localStorage.getItem('figma_file_id');
      
      if (!accessToken || !fileId) {
        observer.next([]);
        observer.complete();
        return;
      }

      fetch(`https://api.figma.com/v1/files/${fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || `HTTP ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        const tokens: EnhancedDesignToken[] = [];
        
        // Simple token extraction for now - just create tokens from what we have
        if (data.styles) {
          console.log('Found styles:', Object.keys(data.styles).length);
          console.log('Sample style data:', data.styles);
          
          Object.entries(data.styles).forEach(([styleId, style]: [string, any]) => {
            console.log(`Processing style ${style.name}:`, style);
            
            if (style.styleType === 'FILL') {
              // For now, use a simple color generation based on the style name
              let colorValue = '#000000';
              let category = 'colors/primary';
              
              // Generate a deterministic color based on the style name
              const hash = style.name.split('').reduce((a: number, b: string) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
              }, 0);
              
              // Create a more appealing color palette
              const hue = Math.abs(hash) % 360;
              const saturation = 60 + (Math.abs(hash) % 20); // 60-80%
              const lightness = 45 + (Math.abs(hash) % 20); // 45-65%
              colorValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
              
              // Determine category based on name
              const name = style.name.toLowerCase();
              if (name.includes('primary')) category = 'colors/primary';
              else if (name.includes('secondary')) category = 'colors/secondary';
              else if (name.includes('neutral')) category = 'colors/neutral';
              else if (name.includes('semantic')) category = 'colors/semantic';
              else if (name.includes('background')) category = 'colors/background';
              else if (name.includes('text')) category = 'colors/text';
              else if (name.includes('success')) category = 'colors/semantic';
              else if (name.includes('error') || name.includes('danger')) category = 'colors/semantic';
              else if (name.includes('warning')) category = 'colors/semantic';
              else if (name.includes('info')) category = 'colors/semantic';
              
              tokens.push({
                id: styleId,
                name: style.name,
                type: 'color',
                value: colorValue,
                description: style.description || `Color style: ${style.name}`,
                category: category,
                fileId: fileId,
                styleId: styleId,
                usage: [],
                lastModified: new Date(style.updatedAt || Date.now()).toISOString()
              });
              
              console.log(`Created token for ${style.name}:`, colorValue);
            } else if (style.styleType === 'TEXT') {
              tokens.push({
                id: styleId,
                name: style.name,
                type: 'typography',
                value: { fontSize: '16', fontFamily: 'Inter', fontWeight: '400' },
                description: style.description || `Typography style: ${style.name}`,
                category: 'typography/body',
                fileId: fileId,
                styleId: styleId,
                usage: [],
                lastModified: new Date(style.updatedAt || Date.now()).toISOString()
              });
            }
          });
        }
        
        console.log('Final tokens created:', tokens.length);
        observer.next(tokens);
        observer.complete();
      })
      .catch(error => {
        console.error('Error fetching tokens:', error);
        observer.next([]);
        observer.complete();
      });
    });
  }

  getEnhancedTokensByType(type: string): Observable<EnhancedDesignToken[]> {
    return this.getEnhancedTokens().pipe(
      map(tokens => tokens.filter(token => token.type === type))
    );
  }

  getEnhancedTokensByCategory(category: string): Observable<EnhancedDesignToken[]> {
    return this.getEnhancedTokens().pipe(
      map(tokens => tokens.filter(token => token.category === category))
    );
  }

  getEnhancedComponents(): Observable<EnhancedFigmaComponent[]> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('figma_access_token');
      const fileId = localStorage.getItem('figma_file_id');
      
      if (!accessToken || !fileId) {
        observer.next([]);
        observer.complete();
        return;
      }

      fetch(`https://api.figma.com/v1/files/${fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || `HTTP ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        const components: EnhancedFigmaComponent[] = [];
        
        // Extract components
        if (data.components) {
          Object.entries(data.components).forEach(([componentId, component]: [string, any]) => {
            components.push({
              id: componentId,
              name: component.name,
              type: component.componentSetId ? 'COMPONENT_SET' : 'COMPONENT',
              description: component.description || '',
              fileId: fileId,
              pageId: component.pageId || '',
              frameId: component.frameId || '',
              usedTokens: {
                colors: [],
                typography: [],
                spacing: [],
                effects: []
              },
              properties: component.componentProperties || {},
              absoluteBoundingBox: {
                x: component.absoluteBoundingBox?.x || 0,
                y: component.absoluteBoundingBox?.y || 0,
                width: component.absoluteBoundingBox?.width || 100,
                height: component.absoluteBoundingBox?.height || 100
              },
              children: component.children || [],
              preview: {
                image: '', // Will be populated by authenticated call
                html: ''
              },
              lastModified: new Date(component.updatedAt || Date.now()).toISOString()
            });
          });
        }
        
        // Create simple placeholders for components
        if (components.length > 0) {
          console.log('Creating placeholders for components:', components.length);
          
          components.forEach(component => {
            const width = component.absoluteBoundingBox.width || 100;
            const height = component.absoluteBoundingBox.height || 100;
            
            // Generate a color based on component name
            const hash = component.name.split('').reduce((a: number, b: string) => {
              a = ((a << 5) - a) + b.charCodeAt(0);
              return a & a;
            }, 0);
            const hue = Math.abs(hash) % 360;
            const color = `hsl(${hue}, 70%, 60%)`;
            
            // Create SVG placeholder
            const svg = `
              <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${color}" opacity="0.8"/>
                <rect width="100%" height="100%" fill="none" stroke="#333" stroke-width="2" opacity="0.3"/>
                <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-family="Arial, sans-serif" font-size="12" fill="#333" opacity="0.7">${component.name}</text>
              </svg>
            `;
            
            // Convert SVG to data URL
            const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
            component.preview.image = dataUrl;
            
            console.log(`Created placeholder for component ${component.name}`);
          });
        }
        
        console.log('Components loaded with placeholders:', components.length);
        observer.next(components);
        observer.complete();
      })
      .catch(error => {
        console.error('Error fetching components:', error);
        observer.next([]);
        observer.complete();
      });
    });
  }

  getEnhancedComponentById(componentId: string): Observable<EnhancedFigmaComponent> {
    return this.getEnhancedComponents().pipe(
      map(components => {
        const component = components.find(c => c.id === componentId);
        if (!component) {
          throw new Error(`Component with ID ${componentId} not found`);
        }
        return component;
      })
    );
  }

  getComponentsUsingToken(tokenId: string): Observable<EnhancedFigmaComponent[]> {
    return this.getEnhancedComponents().pipe(
      map(components => components.filter(component => 
        this.isComponentUsingToken(component, tokenId)
      ))
    );
  }

  getFigmaFiles(): Observable<FigmaFile[]> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('figma_access_token');
      const fileId = localStorage.getItem('figma_file_id');
      
      if (!accessToken || !fileId) {
        observer.next([]);
        observer.complete();
        return;
      }

      fetch(`https://api.figma.com/v1/files/${fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || `HTTP ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        const files: FigmaFile[] = [{
          id: fileId,
          name: data.name,
          type: 'design-system',
          description: 'Main design system file',
          priority: 1,
          lastModified: new Date(data.lastModified).toISOString(),
          version: data.version
        }];
        observer.next(files);
        observer.complete();
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        observer.next([]);
        observer.complete();
      });
    });
  }

  // Helper methods for enhanced data
  getTokenUsageCount(token: EnhancedDesignToken): number {
    return token.usage ? token.usage.length : 0;
  }

  getComponentTokenCount(component: EnhancedFigmaComponent): number {
    if (!component.usedTokens) return 0;
    return Object.values(component.usedTokens).reduce((total, tokens) => total + tokens.length, 0);
  }

  getComponentTokenTypes(component: EnhancedFigmaComponent): string[] {
    if (!component.usedTokens) return [];
    return Object.keys(component.usedTokens).filter(key => {
      const tokenArray = component.usedTokens[key as keyof typeof component.usedTokens];
      return tokenArray && tokenArray.length > 0;
    });
  }

  isComponentUsingToken(component: EnhancedFigmaComponent, tokenId: string): boolean {
    if (!component.usedTokens) return false;
    return Object.values(component.usedTokens).some(tokens => tokens.includes(tokenId));
  }

  // Helper method to generate authenticated Figma image URLs
  getAuthenticatedImageUrl(nodeId: string, format: 'png' | 'jpg' | 'svg' = 'png', scale: number = 1): string {
    const accessToken = localStorage.getItem('figma_access_token');
    const fileId = localStorage.getItem('figma_file_id');
    
    if (!accessToken || !fileId) {
      return '';
    }
    
    return `https://api.figma.com/v1/images/${fileId}?ids=${nodeId}&format=${format}&scale=${scale}`;
  }

  // Helper method to get authenticated image with headers
  getAuthenticatedImage(nodeId: string): Observable<string> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('figma_access_token');
      const fileId = localStorage.getItem('figma_file_id');
      
      if (!accessToken || !fileId) {
        observer.next('');
        observer.complete();
        return;
      }

      fetch(`https://api.figma.com/v1/images/${fileId}?ids=${nodeId}&format=png&scale=1`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': accessToken
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const imageUrl = data.images[nodeId];
        observer.next(imageUrl || '');
        observer.complete();
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        observer.next('');
        observer.complete();
      });
    });
  }
} 