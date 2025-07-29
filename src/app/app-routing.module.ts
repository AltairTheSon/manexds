import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { DesignSystemComponent } from './components/design-system/design-system.component';
import { FlowViewerComponent } from './components/flow-viewer/flow-viewer.component';
import { SyncStatusComponent } from './components/sync-status/sync-status.component';
import { EnhancedDesignSystemComponent } from './components/enhanced-design-system/enhanced-design-system.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: EnhancedDesignSystemComponent },
  { path: 'design-system', component: DesignSystemComponent },
  { path: 'flow-viewer', component: FlowViewerComponent },
  { path: 'sync-status', component: SyncStatusComponent },
  { path: 'enhanced-design-system', component: EnhancedDesignSystemComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 