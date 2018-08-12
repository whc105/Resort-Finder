import { Component, OnInit } from '@angular/core';
import { FetchResortsService } from '../fetch-resorts.service';
import { Resort } from '../../resources/models';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const region = this.activatedRoute.snapshot.params.region;
    this.getResortList(region);
  }

  getResortList(region) {
    return this.fetchResortsService
      .getResorts(region)
      .then(resorts => {
        this.displayedResortList = resorts.value;
        this.resortList = resorts.value;
      });
  };

  filterLocationList(filters) {
    //Makes a shallow copy
    this.displayedResortList = this.resortList.slice();

    //Filters locations by region
    if (filters.regions.length !== 0) {
      this.selectedLocationList = filters.regions;
      this.displayedResortList = this.displayedResortList.filter((resort) => {
        return this.selectedLocationList.includes(resort.location);
      });
    }

    //Filters resorts with night skiing
    if (filters.night) {
      this.displayedResortList = this.displayedResortList.filter((resort) => {
        return typeof resort.night_skiing === 'number'
      })
    }

    //Filters Terrain
    //The resort must have greater than or equal to the inputted Trails, Terrain, and Vertical
    this.displayedResortList = this.displayedResortList.filter((resort) => {
      return resort.total_runs >= filters.trails && resort.skiable_terrain >= filters.terrain && resort.vertical_drop >= filters.vertical;
    });

    //Filters resort by the inputted search value
    if (filters.searchValue) {
      this.displayedResortList = this.displayedResortList.filter((resort) => {
        return resort.resort_name.toLowerCase().includes(filters.searchValue.toLowerCase());
      })
    }
  }

}
