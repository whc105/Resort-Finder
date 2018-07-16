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

const appRoutes: Routes = [
  { path: 'resort', component: ResortItemComponent },
  { path: 'resortlists', component: ResortListComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ResortListComponent,
    NavBarComponent,
    ResortItemComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
