import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyEstablishmentsComponent } from './nearby-establishments.component';

describe('NearbyEstablishmentsComponent', () => {
  let component: NearbyEstablishmentsComponent;
  let fixture: ComponentFixture<NearbyEstablishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyEstablishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEstablishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
