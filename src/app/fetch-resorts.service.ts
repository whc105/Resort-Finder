import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FetchResortsService {

  constructor() {}
}


/*
axios.get('/api/getAllResorts').then((data) => {
  console.log(data);
});
*/