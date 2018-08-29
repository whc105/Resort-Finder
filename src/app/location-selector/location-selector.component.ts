import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FetchLocationsService } from '../fetch-locations.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { regions } from '../../resources/predefined-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})

export class LocationSelectorComponent implements OnInit {

  @Output() locationEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveLocations: EventEmitter<any> = new EventEmitter();

  public locations: BehaviorSubject<any[]> = new BehaviorSubject<any>(this.getRegions());
  public selectedLocations: string[] = [];
  public isCollapsed: boolean[] = Array(this.locations.getValue().length).fill(true);

  private subscriptions: Subscription[] = [];

  constructor(
    private fetchLocationsService: FetchLocationsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.url.subscribe((params) => {
        //Gets the region from the params
        this.getLocations(params[1].path);
        if (params[1].path !== "All") {
          this.isCollapsed[0] = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  addLocations(e, location) {
    if (e.target.checked) {
      this.selectedLocations.push(location);
    } else {
      this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1);
    }
    this.locationEvent.emit(this.selectedLocations);
  }

  //Adds to subscription list
  getLocations(paramRegion) {
    this.fetchLocationsService.getLocations(paramRegion).then(() => {

      this.subscriptions.push(
        this.fetchLocationsService.locations$.subscribe((locations) => {
          this.locations.next(locations);
          this.saveLocations.emit(locations);
        })
      );
      
      //Unsubscribe from previous location observable
      this.subscriptions[1].unsubscribe();
      this.subscriptions.pop();
    })
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
