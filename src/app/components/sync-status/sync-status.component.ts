import { Component, OnInit, OnDestroy } from '@angular/core';
import { FigmaServerService, SyncStatus } from '../../services/figma-server.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-sync-status',
  templateUrl: './sync-status.component.html',
  styleUrls: ['./sync-status.component.scss']
})
export class SyncStatusComponent implements OnInit, OnDestroy {
  syncStatus: SyncStatus = {
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
      maxCallsPerHour: 800,
      remainingCalls: 800,
      lastReset: Date.now(),
      canMakeCalls: true
    },
    cacheStatus: {
      isValid: false,
      lastValidation: null,
      validDuration: 1800000
    },
    dataCounts: {
      tokens: 0,
      components: 0,
      pages: 0
    }
  };

  autoSyncStatus: any = {
    enabled: false,
    interval: 30000,
    lastAutoSync: null,
    isWatching: false
  };

  private syncInterval: any;
  private destroy$ = new Subject<void>();

  constructor(private figmaServerService: FigmaServerService) {}

  ngOnInit() {
    this.startSyncStatusMonitoring();
    this.loadAutoSyncStatus();
  }

  ngOnDestroy() {
    if (this.syncInterval) {
      this.syncInterval.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  startSync() {
    this.figmaServerService.startSync('full').subscribe({
      next: (result) => {
        console.log('✅ Sync started successfully');
      },
      error: (error) => {
        console.error('❌ Error starting sync:', error);
      }
    });
  }

  toggleAutoSync() {
    if (this.autoSyncStatus.enabled) {
      this.disableAutoSync();
    } else {
      this.enableAutoSync();
    }
  }

  enableAutoSync() {
    this.figmaServerService.enableAutoSync(this.autoSyncStatus.interval).subscribe({
      next: (result) => {
        console.log('✅ Auto-sync enabled');
        this.loadAutoSyncStatus();
      },
      error: (error) => {
        console.error('❌ Error enabling auto-sync:', error);
      }
    });
  }

  disableAutoSync() {
    this.figmaServerService.disableAutoSync().subscribe({
      next: (result) => {
        console.log('⏸️ Auto-sync disabled');
        this.loadAutoSyncStatus();
      },
      error: (error) => {
        console.error('❌ Error disabling auto-sync:', error);
      }
    });
  }

  updateAutoSyncInterval() {
    this.figmaServerService.updateAutoSyncInterval(this.autoSyncStatus.interval).subscribe({
      next: (result) => {
        console.log('⏱️ Auto-sync interval updated');
        this.loadAutoSyncStatus();
      },
      error: (error) => {
        console.error('❌ Error updating auto-sync interval:', error);
      }
    });
  }

  onIntervalChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const newInterval = parseInt(target.value) * 1000; // Convert to milliseconds
      this.autoSyncStatus.interval = newInterval;
      this.updateAutoSyncInterval();
    }
  }

  private loadAutoSyncStatus() {
    this.figmaServerService.getAutoSyncStatus().subscribe({
      next: (status) => {
        this.autoSyncStatus = status;
      },
      error: (error) => {
        console.error('❌ Error loading auto-sync status:', error);
      }
    });
  }

  private startSyncStatusMonitoring() {
    this.syncInterval = this.figmaServerService.syncStatus$.subscribe(
      status => {
        this.syncStatus = status;
      }
    );
  }

  getSyncStatusText(): string {
    if (this.syncStatus.isSyncing) {
      return `Syncing... ${this.syncStatus.syncProgress}%`;
    }
    if (this.syncStatus.syncError) {
      return 'Sync failed';
    }
    if (this.syncStatus.lastSyncTime) {
      return 'Last synced: ' + new Date(this.syncStatus.lastSyncTime).toLocaleString();
    }
    return 'Not synced';
  }

  getSyncStatusClass(): string {
    if (this.syncStatus.isSyncing) return 'syncing';
    if (this.syncStatus.syncError) return 'error';
    if (this.syncStatus.lastSyncTime) return 'success';
    return 'idle';
  }
} 