import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FetchLocationsService } from '../fetch-locations.service';
import { BehaviorSubject } from 'rxjs';
import { regions } from '../../resources/predefined-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})

export class LocationSelectorComponent implements OnInit {

  @Output() locationEvent: EventEmitter<any> = new EventEmitter();

  public locations: BehaviorSubject<any[]> = new BehaviorSubject<any>(this.getRegions());
  public selectedLocations: string[] = [];
  public isCollapsed: boolean[] = Array(this.locations.getValue().length).fill(true);

  constructor(
    private fetchLocationsService: FetchLocationsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLocations();
    const paramRegion = this.activatedRoute.snapshot.params.region;
    if (paramRegion !== "All") {
      this.isCollapsed[0] = false;
    }
  }

  addLocations(e, location) {
    if (e.target.checked) {
      this.selectedLocations.push(location);
    } else {
      this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1);
    }
    this.locationEvent.emit(this.selectedLocations);
  }

  getLocations() {
    const paramRegion = this.activatedRoute.snapshot.params.region;
    this.fetchLocationsService.getLocations(paramRegion)
      .then((locations) => {
        this.locations.next(locations.value);
      });
  }

  getRegions() {
    const paramRegion = this.activatedRoute.snapshot.params.region;
    if (paramRegion !== "All") {
      return regions.filter((location) => {
        return location.region === paramRegion;
      });
    } else {
      return regions;
    }
  }
}
