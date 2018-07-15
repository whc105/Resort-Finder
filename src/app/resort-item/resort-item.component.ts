import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'resort-item',
  templateUrl: './resort-item.component.html',
  styleUrls: ['./resort-item.component.css']
})
export class ResortItemComponent implements OnInit {

  @Input() resort: any;

  constructor() {}

  ngOnInit() {
    
  }

}
