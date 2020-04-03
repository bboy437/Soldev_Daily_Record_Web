import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecordLisingComponent } from './daily-record-lising.component';

describe('DailyRecordLisingComponent', () => {
  let component: DailyRecordLisingComponent;
  let fixture: ComponentFixture<DailyRecordLisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordLisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRecordLisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
