import { Injectable } from '@angular/core';

// Google Maps API
@Injectable({
  providedIn: 'root'
})
export class FetchMapsDataService {

  private init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }

  constructor() { }

  getDistance(startingLocation, location) {
    return fetch(`/api/getDistance/${location}/${startingLocation || undefined}`, this.init).then((response) => {
      return response.json();
    }).then((distance) => {
      return distance;
    });
  }

  getNearbyCity(location) {
    return fetch(`/api/getNearbyCity/${location}`, this.init).then((response) => {
      return response.json();
    }).then((locality) => {
      return locality;
    });
  }
}
