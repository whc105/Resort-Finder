import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { regions } from './../../resources/predefined-data';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public regionsList: string[] = [];
  public toShow: boolean = true;
  public selectedValue: string = "Select A Region";

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && e.url === "/") {
        this.selectedValue = "Select A Region";
      }
    });
    this.regionsList = regions.map((region) => {
      return region.region;
    });
    this.regionsList.push("All");
  }

  redirectToRegion(region) {
    if (region !== "Select A Region") {
      this.selectedValue = region;
      this.router.navigate([`/resorts/${region}`]);
    }
  }
}
