import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private model = {
    left: true,
    middle: true,
    right: true
  };

  constructor() {}

  ngOnInit() {
  }

}
