import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortItemComponent } from './resort-item.component';

describe('ResortItemComponent', () => {
  let component: ResortItemComponent;
  let fixture: ComponentFixture<ResortItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
