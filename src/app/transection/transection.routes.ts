import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyRecordLisingComponent } from './daily-record-lising/daily-record-lising.component';






const pagesRoutes: Routes = [
  { path: '', redirectTo: '/pages/login', pathMatch: 'full' },
  { path: 'daily-record-lising', component: DailyRecordLisingComponent ,data: { animation: 'daily-record-lising' }},


  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class TransectionRouterModule {}