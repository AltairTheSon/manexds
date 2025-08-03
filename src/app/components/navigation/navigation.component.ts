import { Component, OnInit, OnDestroy } from '@angular/core';
import { FigmaServerService } from '../../services/figma-server.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navItems = [
    {
      path: '/connect',
      label: 'Connect Figma',
      description: 'Connect to your Figma file'
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      description: 'Enhanced Design System Overview'
    },
    {
      path: '/design-system',
      label: 'Design System',
      description: 'Basic Design Tokens & Components'
    },
    {
      path: '/flow-viewer',
      label: 'Flow Viewer',
      description: 'Page Flows & Navigation'
    },
    {
      path: '/sync-status',
      label: 'Sync Status',
      description: 'Figma Sync & Status'
    }
  ];

  isConnected = false;
  connectionStatusText = 'Not Connected';
  private syncStatusSubscription?: Subscription;

  constructor(private figmaService: FigmaServerService) {}

  ngOnInit() {
    this.updateConnectionStatus();
    this.syncStatusSubscription = this.figmaService.syncStatus$.subscribe(status => {
      this.updateConnectionStatus();
    });
  }

  ngOnDestroy() {
    if (this.syncStatusSubscription) {
      this.syncStatusSubscription.unsubscribe();
    }
  }

  private updateConnectionStatus() {
    const currentStatus = this.figmaService.getCurrentSyncStatus();
    this.isConnected = currentStatus.apiUsage.canMakeCalls && !currentStatus.syncError;
    this.connectionStatusText = this.isConnected ? 'Connected to Figma' : 'Not Connected';
  }
} 