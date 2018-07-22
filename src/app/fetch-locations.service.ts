import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchLocationsService {
  
  public locations: any[] = [];

  constructor() { }

  getLocations() {
    if (this.locations.length === 0) {
      return from(this.fetchLocations().then((locations) => {
        this.locations = locations;
        return this.locations;
      }))
    } else {
      return from(this.locations);
    }
  }

  fetchLocations() {
    return fetch('/api/getAllLocations').then((response) => {
      return response.json();
    }).then((locations) => {
      return locations;
    })
  }
}
