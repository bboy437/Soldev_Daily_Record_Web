import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListingComponent } from './project-listing.component';

describe('ProjectListingComponent', () => {
  let component: ProjectListingComponent;
  let fixture: ComponentFixture<ProjectListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
