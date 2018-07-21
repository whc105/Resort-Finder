import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchResortsService {

  public resorts: any[] = [];

  constructor() {}

  getResorts() {
    if (this.resorts.length === 0) {
      return from(this.fetchResorts().then((result) => {
        this.resorts = result;
        return this.resorts;
      }))
    } else {
      return from(this.resorts);
    }
  }

  fetchResorts() {
    return fetch('/api/getAllResorts').then((response) => {
      return response.json();
    }).then((resorts) => {
      return resorts;
    })
  }

}