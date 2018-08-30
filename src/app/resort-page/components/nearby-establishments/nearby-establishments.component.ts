import { Component, OnInit, Input } from '@angular/core';
import { FetchYelpDataService } from '../../../fetch-yelp-data.service';

@Component({
  selector: 'nearby-establishments',
  templateUrl: './nearby-establishments.component.html',
  styleUrls: ['./nearby-establishments.component.css']
})
export class NearbyEstablishmentsComponent implements OnInit {

  @Input() location: string;
  @Input() category: string;

  public localEstablishments: any[] = [];

  constructor(
    private fetchYelpDataService: FetchYelpDataService
  ) { }

  ngOnInit() {
    this.fetchYelpDataService[`get${this.category.replace(/\s/g,'')}`](this.location).then((localEstablishments) => {
      this.localEstablishments = localEstablishments;
    });
  }

  navigateToYelp(url) {
    window.open(url);
  }

}
