import { Component, OnInit } from '@angular/core';
import { FetchResortsService } from '../fetch-resorts.service';

@Component({
  selector: 'resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.css']
})

export class ResortListComponent implements OnInit {

  public resortList: any[] = [];
  public displayedResortList: any[] = [];
  public selectedLocationList: string[] = [];

  constructor(
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() {
    this.getResortList();
  }

  getResortList() {
    return this.fetchResortsService
    .getResorts().toPromise()
    .then(resorts => {
      this.displayedResortList = resorts;
      this.resortList = resorts;
    });
  };

  filterLocationList(locationFilters) {

    //Makes a shallow copy
    this.displayedResortList = this.resortList.slice();
    if (locationFilters.locationList.length !== 0) {
      this.selectedLocationList = locationFilters.locationList;
      this.displayedResortList = this.displayedResortList.filter((resort) => {
        return this.selectedLocationList.includes(resort.location);
      });
    }

    if (locationFilters.night) {
      this.displayedResortList = this.displayedResortList.filter((resort) => {
        return typeof resort.night_skiing === 'number'
      })
    }
  }

}
