import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { UserPropsService } from '../user-props.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public startingLocation: BehaviorSubject<string> = new BehaviorSubject("");

  private subscriptions: Subscription[] = [];

  constructor(
    private userPropsService: UserPropsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.userPropsService.startingLocation$.subscribe((startingLocation) => {
        this.startingLocation.next(startingLocation);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  alterLocation(event) {
    this.userPropsService.setStartingLocation(event.target.value);
  }

}
