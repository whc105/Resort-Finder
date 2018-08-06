import { Injectable } from '@angular/core';

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

  getDistance(location) {
    return fetch(`/api/getDistance/${location}`, this.init).then((response) => {
      return response.json();
    }).then((distance) => {
      return distance;
    })
  }

  getRating(location) {
    return fetch(`/api/getNearbyRestaurants/${location}`, this.init).then((response) => {
      return response.json();
    }).then((nearbyRestaurants) => {
      return nearbyRestaurants;
    })
  }
}
