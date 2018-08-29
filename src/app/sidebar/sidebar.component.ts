import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from "@angular/forms"

import { FetchResortsService } from '../fetch-resorts.service';

@Component({
  selector: 'list-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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

  public locations: any[] = [];

  markers: any[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(
    private formBuilder: FormBuilder,
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() {
  }

  regionSelector(regions) {
    this.filterInputs.patchValue({
      regions: regions
    });
    this.filters.emit(this.filterInputs.value);
  }

  saveLocations(locations) {
    this.locations = locations;
    this.fetchResortsService.fetchResortGeoLocation(this.locations).then((resortGeoLocations) => {
      console.log(resortGeoLocations);
    });
  }

  emitFilterData(e) {
    this.filters.emit(this.filterInputs.value);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

}
