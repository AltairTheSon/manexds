import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navItems = [
    {
      path: '/dashboard',
      label: '🏠 Dashboard',
      description: 'Enhanced Design System Overview'
    },
    {
      path: '/design-system',
      label: '🎨 Design System',
      description: 'Basic Design Tokens & Components'
    },
    {
      path: '/flow-viewer',
      label: '📱 Flow Viewer',
      description: 'Page Flows & Navigation'
    },
    {
      path: '/sync-status',
      label: '🔄 Sync Status',
      description: 'Figma Sync & Status'
    }
  ];

  constructor() {}
} 