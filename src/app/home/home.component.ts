import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hoverFields: any = {
    rockymtn: false,
  }

  constructor() { }

  ngOnInit() {
  }

  flipOver(event, field) {
    this.hoverFields[field] = false;
  }

  flipBack(event, field) {
    this.hoverFields[field] = true;
  }

}
