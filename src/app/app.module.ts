import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResortListComponent } from './resort-list/resort-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResortItemComponent } from './resort-item/resort-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ResortListComponent,
    NavBarComponent,
    ResortItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
