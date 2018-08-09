import { Component, OnInit, Input } from '@angular/core';
import Resort from '../../../../resources/resorts';


@Component({
  selector: 'resort-information-sidebar',
  templateUrl: './resort-information-sidebar.component.html',
  styleUrls: ['./resort-information-sidebar.component.css']
})
export class ResortInformationSidebarComponent implements OnInit {

  @Input() resort: Resort;
  @Input() resortLink: any;
  @Input() resortMap: any;

  public openedMap: boolean = false;

  constructor() { }

  ngOnInit() {}

  closeTrailMap() {
    this.openedMap = false;
  }

  openTrailMap() {
    this.openedMap = true;
  }

}
