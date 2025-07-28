import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SyncStatusComponent } from './components/sync-status/sync-status.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';

@NgModule({
  declarations: [
    AppComponent,
    SyncStatusComponent,
    DesignSystemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 