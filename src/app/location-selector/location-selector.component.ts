import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FetchLocationsService } from '../fetch-locations.service';
import { BehaviorSubject } from 'rxjs';
import { regions } from '../../resources/predefined-data';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})

export class LocationSelectorComponent implements OnInit {

  @Output() locationEvent: EventEmitter<any> = new EventEmitter();

  public locations: BehaviorSubject<any[]> = new BehaviorSubject<any>(regions);
  public selectedLocations: string[] = [];
  public isCollapsed: boolean[] = Array(7).fill(true);

  constructor(
    private fetchLocationsService: FetchLocationsService
  ) {}

  ngOnInit() {
    this.getLocations();
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
    this.fetchLocationsService.getLocations()
    .then((locations) => {
      this.locations.next(locations.value);
    });
  }
}
