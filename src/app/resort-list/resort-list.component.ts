import { Component, OnInit } from '@angular/core';
import { FetchResortsService } from '../fetch-resorts.service';
import { Resort } from '../../resources/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.css']
})

export class ResortListComponent implements OnInit {

  public resortList: BehaviorSubject<Resort[]> = new BehaviorSubject([]);
  public filters: BehaviorSubject<{}> = new BehaviorSubject({});
  public sorts: BehaviorSubject<{}> = new BehaviorSubject({});

  private subscriptions: Subscription[] = [];

  constructor(
    private fetchResortsService: FetchResortsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const region = this.activatedRoute.snapshot.params.region;
    this.getResortList(region);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getResortList(region) {
    this.fetchResortsService.getResorts(region).then(() => {
      this.subscriptions.push(
        combineLatest(this.fetchResortsService.resorts$, this.filters, this.sorts)
          .pipe(map(([resorts, filters, sorts]) => {
            //If filter is not applied at all, sorts can still function
            if (Object.keys(filters).length > 1) {
              let filteredResorts = this.filterResorts(resorts, filters);
              filteredResorts = this.sortResorts(filteredResorts, sorts);
              return filteredResorts;
            } else {
              resorts = this.sortResorts(resorts, sorts);
              return resorts;
            }
          }))
          .subscribe((resorts) => {
            this.resortList.next(resorts);
          }),
      );
    })
  };

  saveFilters(filters) {
    this.filters.next(filters);
  }

  saveSortProps(sortProps) {
    this.sorts.next(sortProps);
  }

  filterResorts(resorts, filters) {
    //Filters locations by region
    if (filters.regions && filters.regions.length !== 0) {
      resorts = resorts.filter((resort) => {
        return filters.regions.includes(resort.location);
      });
    }

    const year = new Date().getFullYear();
    resorts = resorts.filter((resort) => {
      //Filters resorts with night skiing
      if (filters.night && typeof resort.night_skiing !== 'number') {
        return false;
      }

      //Filters resorts that are open
      if (filters.open && moment().isBetween(moment(`${resort.season_close}/${year}`, "MM/D/YYYY"), moment(`${resort.season_open}/${year}`, "MM/D/YYYY"))) {
        return false;
      }

      //Filters resort by the inputted search value
      if (filters.searchValue && !resort.resort_name.toLowerCase().includes(filters.searchValue.toLowerCase())) {
        return false;
      }

      return true;
    })

    //Filters Terrain
    //The resort must have greater than or equal to the inputted Trails, Terrain, and Vertical
    resorts = resorts.filter((resort) => {
      return resort.total_runs >= filters.trails && resort.skiable_terrain >= filters.terrain && resort.vertical_drop >= filters.vertical;
    });

    return resorts;
  }

  sortResorts(resort, sorts) {
    return resort.sort((a, b) => {
      if (sorts.direction) {
        return b[sorts.property] - a[sorts.property];
      } else {
        return a[sorts.property] - b[sorts.property];
      }
    });
  }

}
