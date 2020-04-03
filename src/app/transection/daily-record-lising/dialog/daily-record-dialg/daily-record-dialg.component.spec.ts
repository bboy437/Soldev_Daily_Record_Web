import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecordDialgComponent } from './daily-record-dialg.component';

describe('DailyRecordDialgComponent', () => {
  let component: DailyRecordDialgComponent;
  let fixture: ComponentFixture<DailyRecordDialgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordDialgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRecordDialgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
