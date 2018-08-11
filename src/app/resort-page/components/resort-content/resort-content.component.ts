import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FetchMapsDataService } from '../../../fetch-maps-data.service';

import { Resort, Locality } from '../../../../resources/models';
import googleAPIKey from '../../../../resources/key';


@Component({
  selector: 'resort-content',
  templateUrl: './resort-content.component.html',
  styleUrls: ['./resort-content.component.css']
})
export class ResortContentComponent implements OnInit {

  @Input() resort: Resort;
  public restaurantCollapse: boolean = false;
  public hotelCollapse: boolean = false;
  public startingLocation: string = "New York City"
  public ticketPriceCostBasis: number;
  public mapContent: any;
  public distanceData: any;
  public nearbyRestaurants: any[] = [];
  public nearbyHotels: any[] = [];
  public resortLink: any;
  public locality: Locality;

  constructor(
    private sanitizer: DomSanitizer,
    private fetchMapsDataService: FetchMapsDataService,
  ) { }

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

    this.fetchMapsDataService.getNearbyCity(this.resort.resort_name).then((locality) => {
      this.locality = locality;
    })
  }

  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
