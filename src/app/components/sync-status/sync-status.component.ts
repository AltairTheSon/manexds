import { Component, OnInit, OnDestroy } from '@angular/core';
import { FigmaServerService, SyncStatus } from '../../services/figma-server.service';
import { Subscription } from 'rxjs';

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
    dataCounts: { tokens: 0, components: 0, pages: 0 }
  };

  private syncStatusSubscription?: Subscription;

  constructor(private figmaServerService: FigmaServerService) {}

  ngOnInit() {
    this.syncStatusSubscription = this.figmaServerService.syncStatus$.subscribe(
      status => {
        this.syncStatus = status;
      }
    );
  }

  ngOnDestroy() {
    if (this.syncStatusSubscription) {
      this.syncStatusSubscription.unsubscribe();
    }
  }

  startSync() {
    this.figmaServerService.startSync('full').subscribe({
      next: (result) => {
        if (result.success) {
          console.log('✅ Sync started successfully');
        }
      },
      error: (error) => {
        console.error('❌ Error starting sync:', error);
      }
    });
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