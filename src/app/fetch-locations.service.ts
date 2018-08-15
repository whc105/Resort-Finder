import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchLocationsService {
  
  public locations: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public locations$: Observable<any[]> = this.locations.asObservable();

  constructor() { }

  getLocations(regions) {
    return this.fetchLocations().then((locations) => {
      if (regions !== "All") {
        locations = locations.filter((location) => {
          return location.region === regions
        });
      }
      this.locations.next(locations);
      //return this.locations;
    })
  }

  fetchLocations() {
    return fetch('/api/getAllLocations').then((response) => {
      return response.json();
    }).then((locations) => {
      return locations;
    })
  }
}
