import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchMapsDataService {

  constructor() { }

  getDistance(location) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }
    return fetch(`/api/getDistance/${location}`, init).then((response) => {
      return response.json();
    }).then((distance) => {
      return distance;
    })
  }
}
