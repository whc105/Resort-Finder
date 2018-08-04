import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Resort from '../resources/resorts';

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

}