import { Component, OnInit } from '@angular/core';
import { FetchResortsService } from '../fetch-resorts.service';

@Component({
  selector: 'resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.css']
})
export class ResortListComponent implements OnInit {

  constructor(
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() {
  }

}
