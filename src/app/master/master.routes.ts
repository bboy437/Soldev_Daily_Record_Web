import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserChangpasswordComponent } from './user-changpassword/user-changpassword.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityListingComponent } from './activity-listing/activity-listing.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';




const pagesRoutes: Routes = [
 
     { path: 'user-changpassword', component: UserChangpasswordComponent ,data: { animation: 'user-changpassword' } },
     { path: 'activity-detail', component: ActivityDetailComponent ,data: { animation: 'activity-detail' } },
     { path: 'activity-listing', component: ActivityListingComponent ,data: { animation: 'activity-listing' } },
     { path: 'customer-detail', component: CustomerDetailComponent ,data: { animation: 'customer-detail' } },
     { path: 'customer-listing', component: CustomerListingComponent ,data: { animation: 'customer-listing' } },
     { path: 'project-detail', component: ProjectDetailComponent ,data: { animation: 'project-detail' } },
     { path: 'project-listing', component: ProjectListingComponent ,data: { animation: 'project-listing' } },



  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}