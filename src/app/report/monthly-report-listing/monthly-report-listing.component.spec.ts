import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReportListingComponent } from './monthly-report-listing.component';

describe('MonthlyReportListingComponent', () => {
  let component: MonthlyReportListingComponent;
  let fixture: ComponentFixture<MonthlyReportListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyReportListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyReportListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
