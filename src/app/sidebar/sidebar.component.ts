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

  markers: any[] = []

  // initial center position for the map
  public lat: number = 0;
  public lng: number = 0;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.resortList.length > 0) {
      const resortNames = this.resortList.map((resort) => {
        return resort.resort_name;
      })
      this.getGeoLocations(resortNames);
    }
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  regionSelector(regions) {
    this.filterInputs.patchValue({
      regions: regions
    });
    this.filters.emit(this.filterInputs.value);
  }

  getGeoLocations(resorts) {
    this.lat = 0;
    this.lng = 0;
    this.fetchResortsService.fetchResortsGeoLocation(resorts).then((resortsGeoLocations) => {
      this.markers = resortsGeoLocations.map((resort) => {
        this.lat += parseFloat(resort.SkiArea.geo_lat);
        this.lng += parseFloat(resort.SkiArea.geo_lng);
        return {
          lat: parseFloat(resort.SkiArea.geo_lat),
          lng: parseFloat(resort.SkiArea.geo_lng),
          label: resort.SkiArea.name,
          draggable: true
        }
      });
      this.lat /= this.markers.length;
      this.lng /= this.markers.length;
      console.log(this.lat, this.lng)
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
