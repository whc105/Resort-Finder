import { Component, OnInit, Input } from '@angular/core';
import Resort from '../../../../resources/resorts';

@Component({
  selector: 'resort-content',
  templateUrl: './resort-content.component.html',
  styleUrls: ['./resort-content.component.css']
})
export class ResortContentComponent implements OnInit {

  @Input() resort: Resort;
  private ticketPriceCostBasis;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.resort && this.resort.lift_tickets) {
      this.ticketPriceCostBasis = this.resort.lift_tickets - 55;
    }
  }

}
