import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortListHeaderComponent } from './resort-list-header.component';

describe('ResortListHeaderComponent', () => {
  let component: ResortListHeaderComponent;
  let fixture: ComponentFixture<ResortListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
