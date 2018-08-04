import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortContentComponent } from './resort-content.component';

describe('ResortContentComponent', () => {
  let component: ResortContentComponent;
  let fixture: ComponentFixture<ResortContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
