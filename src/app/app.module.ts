import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './component/map/map.component';
import { MapPanelComponent } from './component/map-panel/map-panel.component';
import { FilterObjectsPipe } from './pipes/filter-objects.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapPanelComponent,
    FilterObjectsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
