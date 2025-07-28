import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
    // Poll sync status every 1 second when syncing, every 5 seconds when idle
    this.syncInterval = interval(1000).pipe(
      switchMap(() => {
        const currentStatus = this.syncStatusSubject.value;
        if (currentStatus.isSyncing) {
          return this.getSyncStatus();
        }
        return of(currentStatus);
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
} 