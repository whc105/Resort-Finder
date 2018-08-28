import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Resort } from '../../../../resources/models';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'resort-information-sidebar',
  templateUrl: './resort-information-sidebar.component.html',
  styleUrls: ['./resort-information-sidebar.component.css']
})
export class ResortInformationSidebarComponent implements OnInit {

  @Input() resort: Resort;
  @Input() resortLink: any;
  @Input() resortMap: any;

  public isClosed: boolean;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.checkIsClosed();
  }

  checkIsClosed() {
    const year = new Date().getFullYear();
    this.isClosed = moment().isBetween(moment(`${this.resort.season_close}/${year}`, "MM/D/YYYY"), moment(`${this.resort.season_open}/${year}`, "MM/D/YYYY"))
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

}
