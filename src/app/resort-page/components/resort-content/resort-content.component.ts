import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FetchMapsDataService } from '../../../fetch-maps-data.service';
import { FetchYelpDataService} from '../../../fetch-yelp-data.service';

import { Resort, Locality } from '../../../../resources/models';
import googleAPIKey from '../../../../resources/key';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserPropsService } from '../../../user-props.service';


@Component({
  selector: 'resort-content',
  templateUrl: './resort-content.component.html',
  styleUrls: ['./resort-content.component.css']
})
export class ResortContentComponent implements OnInit {

  @Input() resort: Resort;

  private subscriptions: Subscription[] = [];

  public restaurantCollapse: boolean = false;
  public hotelCollapse: boolean = false;
  public startingLocation: BehaviorSubject<string> = new BehaviorSubject("");
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
    private fetchYelpDataService: FetchYelpDataService,
    private userPropsService: UserPropsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.userPropsService.startingLocation$.subscribe((startingLocation) => {
        this.startingLocation.next(startingLocation);
      })
    );

    this.ticketPriceCostBasis = this.resort.lift_tickets - 55;
    this.mapContent = this.sanitizeURL(`https://www.google.com/maps/embed/v1/place?q=${this.resort.resort_name}%20${this.resort.location}&key=${googleAPIKey}`);

    this.fetchMapsDataService.getDistance(this.startingLocation.value, `${this.resort.resort_name} ${this.resort.location}`).then((distance) => {
      this.distanceData = distance[0].elements[0];
    });

    this.fetchMapsDataService.getNearbyCity(`${this.resort.resort_name} ${this.resort.location}`).then((locality) => {
      this.locality = locality;
    });
  }

  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
