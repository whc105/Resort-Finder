import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resort } from '../resources/models';

@Injectable({
  providedIn: 'root'
})

export class FetchResortsService {

  private resorts: BehaviorSubject<Resort[]> = new BehaviorSubject([]);
  public resorts$: Observable<Resort[]> = this.resorts.asObservable();

  constructor() { }

  getResorts(region) {
    if (region === "All") {
      return this.fetchResorts();
    } else {
      return this.fetchResortsByRegion(region);
    }
  }

  fetchResorts() {
    return fetch('/api/getAllResorts').then((response) => {
      return response.json();
    }).then((resorts) => {
      this.resorts.next(resorts);
    })
  }

  //Finds all resorts by region
  fetchResortsByRegion(region) {
    return fetch(`/api/getResorts/${region}`).then((response) => {
      return response.json();
    }).then((resorts) => {
      this.resorts.next(resorts);
    });
  }

  //For individual resort page

  fetchResort(name) {
    return fetch(`/api/getResort/${name}`).then((response) => {
      return response.json();
    }).then((resort) => {
      return resort;
    });
  }

  fetchResortWebsite(name) {
    return fetch(`/api/getResortWebsite/${name}`).then((response) => {
      return response.json();
    }).then((resort) => {
      return resort;
    });
  }

  //Takes an ID number to find the latest available trailmap
  fetchTrailMap(ID) {
    return fetch(`/api/getResortTrailMap/${ID}`).then((response) => {
      return response.json();
    }).then((resortMap) => {
      return resortMap;
    });
  }

  //Given a list of regions, get resort geolocation for google maps
  fetchRegionsResortGeoLocation(region) {
    return fetch("/api/regions/getResortGeoLocation", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(region)
    }).then((response) => {
      return response.json();
    }).then((resortGeoLocations) => {
      return resortGeoLocations;
    });
  }

  //Given a list of resorts, get the respective resort geolocation for google maps
  fetchResortsGeoLocation(resorts) {
    return fetch("/api/resorts/getResortGeoLocation", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resorts)
    }).then((response) => {
      return response.json();
    }).then((resortGeoLocations) => {
      return resortGeoLocations;
    });
  }
}