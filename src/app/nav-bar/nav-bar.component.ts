import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserPropsService } from '../user-props.service';
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

  public startingLocation: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    public router: Router,
    public userPropsService: UserPropsService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && e.url === "/") {
        this.selectedValue = "Select A Region";
      }
    });

    this.userPropsService.startingLocation$.subscribe((startingLocation) => {
      this.startingLocation.next(startingLocation);
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
