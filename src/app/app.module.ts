import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core'; // Google Maps API

import { LoadingModule } from 'ngx-loading';

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
import { ResortListHeaderComponent } from './resort-list/resort-list-header/resort-list-header.component';
import { NearbyEstablishmentsComponent } from './resort-page/components/nearby-establishments/nearby-establishments.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "resorts", component: ResortListComponent },
  { path: "resorts/:region", component: ResortListComponent }, //Add route guard later
  { path: "resorts/:region/:resort_name", component: ResortPageComponent }
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
    ResortListHeaderComponent,
    NearbyEstablishmentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdouL4ILt_yeXV71VF8brpFy2hMbCQTcg"
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    DropDownsModule,
    BrowserAnimationsModule,
    DialogsModule,
    InputsModule,
    ButtonsModule,
    ToolBarModule,
    LayoutModule,
    TreeViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
