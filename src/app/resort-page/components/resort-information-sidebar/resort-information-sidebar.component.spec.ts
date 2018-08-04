import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortInformationSidebarComponent } from './resort-information-sidebar.component';

describe('ResortInformationSidebarComponent', () => {
  let component: ResortInformationSidebarComponent;
  let fixture: ComponentFixture<ResortInformationSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortInformationSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortInformationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
