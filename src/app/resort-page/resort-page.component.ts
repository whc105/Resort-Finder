import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'resort-page',
  templateUrl: './resort-page.component.html',
  styleUrls: ['./resort-page.component.css']
})
export class ResortPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const resort_name = this.activatedRoute.snapshot.paramMap.get("resort_name");
    console.log(resort_name)
  }

}