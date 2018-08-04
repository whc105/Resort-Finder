import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { FetchResortsService } from '../fetch-resorts.service';
import Resort from '../../resources/resorts';

@Component({
  selector: 'resort-page',
  templateUrl: './resort-page.component.html',
  styleUrls: ['./resort-page.component.css']
})
export class ResortPageComponent implements OnInit {

  public resort: Resort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fetchResortsService: FetchResortsService
  ) { }

  ngOnInit() {
    const resort_name = this.activatedRoute.snapshot.paramMap.get("resort_name");
    this.fetchResortsService.fetchResort(resort_name).then((resort) => {
      this.resort = resort;
    });
  }

}