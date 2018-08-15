import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from "@angular/forms"


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() filters: EventEmitter<any> = new EventEmitter();

  public filterInputs = this.formBuilder.group({
    trails: [15],
    terrain: [150],
    vertical: [750],
    night: [false],
    open: [false],
    regions: [[]], //The regions selected from the region selector
    searchValue: [""],
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
  }

  regionSelector(regions) {
    this.filterInputs.patchValue({
      regions: regions
    })
    this.filters.emit(this.filterInputs.value);
  }

  emitFilterData(e) {
    this.filters.emit(this.filterInputs.value);
  }



}
