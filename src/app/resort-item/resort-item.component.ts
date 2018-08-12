import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resort } from '../../resources/models';

@Component({
  selector: 'resort-item',
  templateUrl: './resort-item.component.html',
  styleUrls: ['./resort-item.component.css']
})
export class ResortItemComponent implements OnInit {

  @Input() resort: Resort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    
  }

  navigateToResort() {
    const region = this.activatedRoute.snapshot.params.region;
    this.router.navigateByUrl(`/resorts/${region}/${this.resort.resort_name}`)
  }

}
