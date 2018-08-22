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

  getDistance(startingLocation, location) {
    return fetch(`/api/getDistance/${location}/${startingLocation || undefined}`, this.init).then((response) => {
      return response.json();
    }).then((distance) => {
      return distance;
    })
  }

  getRestaurants(location) {
    return fetch(`/api/getNearbyRestaurants/${location}`, this.init).then((response) => {
      return response.json();
    }).then((nearbyRestaurants) => {
      return nearbyRestaurants;
    })
  }

  getHotels(location) {
    return fetch(`/api/getNearbyHotels/${location}`, this.init).then((response) => {
      return response.json();
    }).then((hotels) => {
      return hotels;
    })
  }

  getNearbyCity(location) {
    return fetch(`/api/getNearbyCity/${location}`, this.init).then((response) => {
      return response.json();
    }).then((locality) => {
      return locality;
    })
  }
}
