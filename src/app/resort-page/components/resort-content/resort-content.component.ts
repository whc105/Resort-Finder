import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FetchMapsDataService } from '../../../fetch-maps-data.service';
import Resort from '../../../../resources/resorts';
import googleAPIKey from '../../../../resources/key';

@Component({
  selector: 'resort-content',
  templateUrl: './resort-content.component.html',
  styleUrls: ['./resort-content.component.css']
})
export class ResortContentComponent implements OnInit {

  @Input() resort: Resort;
  private restaurantCollapse = false;
  private startingLocation: string = "New York City"
  private ticketPriceCostBasis;
  private mapContent: any;
  private distanceData: any;
  private nearbyRestaurants: any[] = [];

  constructor(
    public sanitizer: DomSanitizer,
    public fetchMapsDataService: FetchMapsDataService
  ) {}

  ngOnInit() {
    this.ticketPriceCostBasis = this.resort.lift_tickets - 55;
    //Fix loop bug
    this.mapContent = this.sanitizeURL(`https://www.google.com/maps/embed/v1/place?q=${this.resort.resort_name}&key=${googleAPIKey}`);
    this.fetchMapsDataService.getDistance(this.resort.resort_name).then((distance) => {
      this.distanceData = distance[0].elements[0];
    });

    this.fetchMapsDataService.getRating(this.resort.resort_name).then((nearbyRestaurants) => {
      this.nearbyRestaurants = nearbyRestaurants;
    })
  }
  
  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
