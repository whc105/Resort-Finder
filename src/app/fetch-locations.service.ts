import { Injectable } from '@angular/core';
import { from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchLocationsService {
  
  public locations: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  getLocations() {
    return this.fetchLocations().then((locations) => {
      this.locations.next(locations)
      return this.locations;
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
