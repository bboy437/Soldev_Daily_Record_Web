import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlyReportListingComponent } from './monthly-report-listing/monthly-report-listing.component';
import { MonthlyReportDetailComponent } from './monthly-report-detail/monthly-report-detail.component';


const pagesRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'monthly-report-listing', component: MonthlyReportListingComponent ,data: { animation: 'monthly-report-listing' }},
   { path: 'monthly-report-detail', component: MonthlyReportDetailComponent ,data: { animation: 'monthly-report-detail' }},
 
  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class ReportRouterModule {}