import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() filters: EventEmitter<any> = new EventEmitter();

  private resortSize = {
    large: true,
    medium: true,
    small: true
  };

  private areaFilters = {
    locationList: [],
    night: false
  }

  constructor() {}

  ngOnInit() {
  }

  locationPicker(locationList) {
    this.areaFilters.locationList = locationList;
    this.filters.emit(this.areaFilters);
  }

  nightPicker(e) {
    this.areaFilters.night = this.areaFilters.night;
    this.filters.emit(this.areaFilters);
  }

}
