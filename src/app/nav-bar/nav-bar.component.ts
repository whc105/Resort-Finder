import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { regions } from './../../resources/predefined-data';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public regionsList: string[] = [];
  public toShow: boolean = true;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.regionsList = regions.map((region) => {
      return region.region;
    });
    this.regionsList.push("All");
  }

  redirectToRegion(region) {
    if (region !== "Select A Region") {
      this.router.navigate([`/resorts/${region}`]);
    }
  }
}
