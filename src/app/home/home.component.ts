import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hoverFields: any = {
    rockymtn: false,
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirect(region) {
    this.router.navigate([`/resorts/${region}`])
  }



}
