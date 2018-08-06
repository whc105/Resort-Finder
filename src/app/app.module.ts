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
import { ResortInformationSidebarComponent } from './resort-page/components/resort-information-sidebar/resort-information-sidebar.component';
import { ResortContentComponent } from './resort-page/components/resort-content/resort-content.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ResortInformationSidebarComponent,
    ResortContentComponent,
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
    ),
    DropDownsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
