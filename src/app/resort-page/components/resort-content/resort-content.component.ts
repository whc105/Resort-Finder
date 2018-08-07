import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FetchMapsDataService } from '../../../fetch-maps-data.service';
import { FetchResortsService } from '../../../fetch-resorts.service';

import Resort from '../../../../resources/resorts';
import googleAPIKey from '../../../../resources/key';


@Component({
  selector: 'resort-content',
  templateUrl: './resort-content.component.html',
  styleUrls: ['./resort-content.component.css']
})
export class ResortContentComponent implements OnInit {

  @Input() resort: Resort;
  private restaurantCollapse: boolean = false;
  private hotelCollapse: boolean = false;
  private startingLocation: string = "New York City"
  private ticketPriceCostBasis: number;
  private mapContent: any;
  private distanceData: any;
  private nearbyRestaurants: any[] = [];
  private nearbyHotels: any[] = [];
  private resortLink: any;

  constructor(
    public sanitizer: DomSanitizer,
    public fetchMapsDataService: FetchMapsDataService,
    public fetchResortsService: FetchResortsService
  ) {}

  ngOnInit() {
    this.ticketPriceCostBasis = this.resort.lift_tickets - 55;
    this.mapContent = this.sanitizeURL(`https://www.google.com/maps/embed/v1/place?q=${this.resort.resort_name}&key=${googleAPIKey}`);
    
    this.fetchMapsDataService.getDistance(this.resort.resort_name).then((distance) => {
      this.distanceData = distance[0].elements[0];
    });

    this.fetchMapsDataService.getRestaurants(this.resort.resort_name).then((nearbyRestaurants) => {
      this.nearbyRestaurants = nearbyRestaurants;
    });

    this.fetchMapsDataService.getHotels(this.resort.resort_name).then((nearbyHotels) => {
      this.nearbyHotels = nearbyHotels
    });
  }
  
  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
