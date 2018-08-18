import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'resort-list-header',
  templateUrl: './resort-list-header.component.html',
  styleUrls: ['./resort-list-header.component.css']
})
export class ResortListHeaderComponent implements OnInit {

  @Output() sortProps: EventEmitter<any> = new EventEmitter();;

  public sort: {
    property: string,
    direction: boolean
  } = {
      property: "",
      direction: undefined
    };

  constructor() { }

  ngOnInit() {
  }

  //Enables sort for the resort fields
  sortProperty(field) {
    if (this.sort.property === field) {
      this.sort.direction = !this.sort.direction;
    } else {
      this.sort.property = field;
      this.sort.direction = true;
    }
    this.sortProps.emit(this.sort);
  }
}
