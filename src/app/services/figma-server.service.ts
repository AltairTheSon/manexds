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
    return this.http.post<{ success: boolean; message: string }>(`${this.MCP_ENDPOINT}/initialize`, {
      figmaToken: token.accessToken,
      fileId: token.fileId,
      teamId: token.teamId
    }).pipe(
      map(response => {
        console.log('🔗 Server connection initialized:', response);
        return response.success;
      }),
      catchError(error => {
        console.error('❌ Failed to initialize server connection:', error);
        return of(false);
      })
    );
  }

  /**
   * Start server-side sync
   */
  startSync(syncType: 'full' | 'tokens' | 'components' | 'pages' = 'full'): Observable<{ success: boolean; syncId: string }> {
    // Immediately set syncing state to true
    const currentStatus = this.syncStatusSubject.value;
    this.syncStatusSubject.next({
      ...currentStatus,
      isSyncing: true,
      syncProgress: 0,
      syncError: null
    });

    return this.http.post<{ success: boolean; syncId: string; syncType: string }>(`${this.MCP_ENDPOINT}/sync`, {
      syncType
    }).pipe(
      map(response => {
        console.log('🔄 Server sync started:', response);
        return { success: response.success, syncId: response.syncId };
      }),
      catchError(error => {
        console.error('❌ Failed to start server sync:', error);
        // Reset syncing state on error
        const currentStatus = this.syncStatusSubject.value;
        this.syncStatusSubject.next({
          ...currentStatus,
          isSyncing: false,
          syncError: 'Failed to start sync'
        });
        return of({ success: false, syncId: '' });
      })
    );
  }

  /**
   * Get sync status
   */
  getSyncStatus(): Observable<SyncStatus> {
    return this.http.get<SyncStatus>(`${this.MCP_ENDPOINT}/sync-status`).pipe(
      map(status => {
        this.syncStatusSubject.next(status);
        return status;
      }),
      catchError(error => {
        console.error('❌ Failed to get sync status:', error);
        return of(this.syncStatusSubject.value);
      })
    );
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
        console.error('❌ Failed to get design tokens:', error);
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
        console.error('❌ Failed to get components:', error);
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
        console.error('❌ Failed to get pages:', error);
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
        console.error('❌ Failed to get containers:', error);
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
        console.error('❌ Failed to get container pages:', error);
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
        console.error('❌ Failed to get token:', error);
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
        console.error('❌ Failed to get component:', error);
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
        console.error('❌ Failed to get page:', error);
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
        console.error('❌ Failed to generate component:', error);
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
        console.error('❌ Failed to generate page:', error);
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
    return this.http.post<{ success: boolean; syncId: string; message: string }>(`${this.MCP_ENDPOINT}/enhanced/sync`, {
      syncType
    });
  }

  getEnhancedTokens(): Observable<EnhancedDesignToken[]> {
    return this.http.get<EnhancedDesignToken[]>(`${this.MCP_ENDPOINT}/enhanced/tokens`);
  }

  getEnhancedTokensByType(type: string): Observable<EnhancedDesignToken[]> {
    return this.http.get<EnhancedDesignToken[]>(`${this.MCP_ENDPOINT}/enhanced/tokens/${type}`);
  }

  getEnhancedTokensByCategory(category: string): Observable<EnhancedDesignToken[]> {
    return this.http.get<EnhancedDesignToken[]>(`${this.MCP_ENDPOINT}/enhanced/tokens/category/${category}`);
  }

  getEnhancedComponents(): Observable<EnhancedFigmaComponent[]> {
    return this.http.get<EnhancedFigmaComponent[]>(`${this.MCP_ENDPOINT}/enhanced/components`);
  }

  getEnhancedComponentById(componentId: string): Observable<EnhancedFigmaComponent> {
    return this.http.get<EnhancedFigmaComponent>(`${this.MCP_ENDPOINT}/enhanced/components/${componentId}`);
  }

  getComponentsUsingToken(tokenId: string): Observable<EnhancedFigmaComponent[]> {
    return this.http.get<EnhancedFigmaComponent[]>(`${this.MCP_ENDPOINT}/enhanced/tokens/${tokenId}/components`);
  }

  getFigmaFiles(): Observable<FigmaFile[]> {
    return this.http.get<FigmaFile[]>(`${this.MCP_ENDPOINT}/files`);
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
} 