import { Component, OnInit } from '@angular/core';
import { UserPropsService } from '../user-props.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hoverFields: any = {
    rockymtn: false,
  }

  public startingLocation: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private userPropsService: UserPropsService
  ) { }

  ngOnInit() {
    this.userPropsService.startingLocation$.subscribe((startingLocation) => {
      this.startingLocation.next(startingLocation);
    });
  }

  alterLocation(event) {
    this.userPropsService.setStartingLocation(event.target.value);
  }

}
