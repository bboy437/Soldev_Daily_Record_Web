import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListingComponent } from './activity-listing.component';

describe('ActivityListingComponent', () => {
  let component: ActivityListingComponent;
  let fixture: ComponentFixture<ActivityListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
