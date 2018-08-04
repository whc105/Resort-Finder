import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResortListComponent } from './resort-list/resort-list.component';
import { ResortItemComponent } from './resort-item/resort-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { ResortPageComponent } from './resort-page/resort-page.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resortlists', component: ResortListComponent },
  { path: 'resortlists/:resort_name', component: ResortPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ResortListComponent,
    NavBarComponent,
    ResortItemComponent,
    ResortPageComponent,
    SidebarComponent,
    LocationSelectorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
