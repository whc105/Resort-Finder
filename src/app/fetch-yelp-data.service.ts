import { Injectable } from '@angular/core';

//Yelp Fusion API
@Injectable({
  providedIn: 'root'
})
export class FetchYelpDataService {

  private init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }

  constructor() { }

  getRestaurants(location) {
    return fetch(`/api/yelp/getNearbyRestaurants/${location}`, this.init).then((response) => {
      return response.json();
    }).then((nearbyRestaurants) => {
      return nearbyRestaurants;
    });
  }
}
