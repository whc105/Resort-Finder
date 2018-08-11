import { Component, OnInit } from '@angular/core';
import { FetchResortsService } from '../fetch-resorts.service';
import { Resort } from '../../resources/models';

@Component({
  selector: 'resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.css']
})

export class ResortListComponent implements OnInit {

  public resortList: Resort[] = [];
  public displayedResortList: Resort[] = [];
  public selectedLocationList: string[] = [];

  constructor(
    private fetchResortsService: FetchResortsService,
  ) {
  }

  ngOnInit() {
    this.getResortList();
  }

  getResortList() {
    return this.fetchResortsService
    .getResorts()
    .then(resorts => {
      this.displayedResortList = resorts.value;
      this.resortList = resorts.value;
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
