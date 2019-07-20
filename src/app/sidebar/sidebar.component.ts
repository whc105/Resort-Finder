import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from "@angular/forms"

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Resort } from '../../resources/models';
import { FetchResortsService } from '../fetch-resorts.service';

@Component({
  selector: 'list-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() resortList: Resort[] = [];
  @Output() filters: EventEmitter<any> = new EventEmitter();

  public filterInputs = this.formBuilder.group({
    trails: [15],
    terrain: [150],
    vertical: [750],
    night: [false],
    open: [false],
    regions: [[]], //The regions selected from the region selector
    searchValue: [""],
  });

  public filterInputsMinMax = {
    trails: {
      min: 0,
      max: 0
    },
    terrain: {
      min: 0,
      max: 0
    },
    vertical: {
      min: 0,
      max: 0
    }
  }

  public markers: any[] = []

  public previousWindow;

  // initial center position for the map
  public lat: number = 0;
  public lng: number = 0;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() {}

  ngOnChanges() {
    this.setMinMaxSidebarValue(this.resortList);
  }

  open(content) {
    this.getGeoLocations(this.resortList);
    this.modalService.open(content, { centered: true });
  }

  regionSelector(regions) {
    this.filterInputs.patchValue({
      regions: regions
    });
    this.filters.emit(this.filterInputs.value);
  }

  setMinMaxSidebarValue(resortList) {
    resortList.forEach((resort) => {
      this.setMinMax("trails", "total_runs", resort);
      this.setMinMax("terrain", "skiable_terrain", resort);
      this.setMinMax("vertical", "vertical_drop", resort);
    });
  }

  setMinMax(filterProperty, resortProperty, resort) {
    if (this.filterInputsMinMax[filterProperty].min > resort[resortProperty] || this.filterInputsMinMax[filterProperty].min === 0) {
      this.filterInputsMinMax[filterProperty].min = resort[resortProperty];
    }
    if (this.filterInputsMinMax[filterProperty].max < resort[resortProperty] ) {
      this.filterInputsMinMax[filterProperty].max = resort[resortProperty];
    }
  }

  getGeoLocations(resorts) {
    this.lat = 0;
    this.lng = 0;
    let totalResorts = 0;
    this.previousWindow = undefined;
    this.fetchResortsService.fetchResortsGeoLocation(resorts).then((resortsGeoLocations) => {
      this.markers = resortsGeoLocations.reduce((acc, current) => {
        if (current.SkiArea.geo_lat && current.SkiArea.geo_lat) {
          this.lat += parseFloat(current.SkiArea.geo_lat);
          this.lng += parseFloat(current.SkiArea.geo_lng);
          acc.push({
            lat: parseFloat(current.SkiArea.geo_lat),
            lng: parseFloat(current.SkiArea.geo_lng),
            name: current.SkiArea.name,
            website: current.SkiArea.official_website,
          });
          totalResorts++;
        }
        return acc;
      }, []);
      this.lat /= totalResorts;
      this.lng /= totalResorts;
    });
  }

  emitFilterData(e) {
    this.filters.emit(this.filterInputs.value);
  }

  clickedMarker(infoWindow) {
    if (this.previousWindow) {
      this.previousWindow.close();
    }
    this.previousWindow = infoWindow;
  }

  mapClicked(event) {
    if (this.previousWindow) {
      this.previousWindow.close();
      this.previousWindow = undefined;
    }
  }

  navigateToSite(url) {
    window.open(url);
  }

}
