import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private userPropsService: UserPropsService
  ) { }

  ngOnInit() {
    this.userPropsService.startingLocation$.subscribe((startingLocation) => {
      this.startingLocation.next(startingLocation);
    });
  }

  redirect(region) {
    this.router.navigate([`/resorts/${region}`]);
  }

  alterLocation(event) {
    this.userPropsService.setStartingLocation(event.target.value);
  }

}
