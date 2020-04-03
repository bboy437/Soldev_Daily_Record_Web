import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { IndexComponent } from './index/index/index.component';
import { UserChangpasswordComponent } from '../pages/user-changpassword/user-changpassword.component';

const pagesRoutes: Routes = [
  	{ path: 'contact', component: ContactComponent ,data: { animation: 'contact' } },
  	{ path: 'about', component: AboutComponent ,data: { animation: 'about' }},
    { path: 'services', component: ServicesComponent ,data: { animation: 'services' }},
    { path: 'index', component: IndexComponent ,data: { animation: 'index' }},
    { path: 'user-changpassword', component: UserChangpasswordComponent ,data: { animation: 'user-changpassword' }},
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class PagesRouterModule {}