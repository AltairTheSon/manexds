import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SyncStatusComponent } from './components/sync-status/sync-status.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';
import { FlowViewerComponent } from './components/flow-viewer/flow-viewer.component';
import { EnhancedDesignSystemComponent } from './components/enhanced-design-system/enhanced-design-system.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    SyncStatusComponent,
    DesignSystemComponent,
    FlowViewerComponent,
    EnhancedDesignSystemComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 