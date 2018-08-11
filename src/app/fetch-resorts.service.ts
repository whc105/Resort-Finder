import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resort } from '../resources/models';

@Injectable({
  providedIn: 'root'
})

export class FetchResortsService {

  public resorts: BehaviorSubject<Resort[]> = new BehaviorSubject([]);

  constructor() {}

  getResorts() {
    return this.fetchResorts().then((result) => {
      this.resorts.next(result);
      return this.resorts
    }); 
  }

  fetchResorts() {
    return fetch('/api/getAllResorts').then((response) => {
      return response.json();
    }).then((resorts) => {
      return resorts;
    })
  }

  fetchResort(name) {
    return fetch(`/api/getResort/${name}`).then((response) => {
      return response.json();
    }).then((resort) => {
      return resort;
    })
  }

  fetchResortWebsite(name) {
    return fetch(`/api/getResortWebsite/${name}`).then((response) => {
      return response.json();
    }).then((resort) => {
      return resort;
    })
  }

  //Takes an ID number to find the latest available trailmap
  fetchTrailMap(ID) {
    return fetch(`/api/getResortTrailMap/${ID}`).then((response) => {
      return response.json()
    }).then((resortMap) => {
      return resortMap
    })
  }

}