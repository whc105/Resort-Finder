import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() locationList: EventEmitter<any> = new EventEmitter();

  private resortSize = {
    large: true,
    medium: true,
    small: true
  };

  constructor() {}

  ngOnInit() {
  }

  locationPicker(locationList) {
    this.locationList.emit(locationList);
  }

}
