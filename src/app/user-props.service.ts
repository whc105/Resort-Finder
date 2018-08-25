import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPropsService {

  private startingLocation: BehaviorSubject<string> = new BehaviorSubject("");
  public startingLocation$: Observable<string> = this.startingLocation.asObservable();

  constructor() { }

  setStartingLocation(newLocation) {
    this.startingLocation.next(newLocation);
  }
}
