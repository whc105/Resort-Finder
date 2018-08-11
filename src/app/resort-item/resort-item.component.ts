import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Resort } from '../../resources/models';

@Component({
  selector: 'resort-item',
  templateUrl: './resort-item.component.html',
  styleUrls: ['./resort-item.component.css']
})
export class ResortItemComponent implements OnInit {

  @Input() resort: Resort;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  navigateToResort(event) {
    this.router.navigateByUrl(`/resortlists/${this.resort.resort_name}`)
  }

}
