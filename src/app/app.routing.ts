import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/transection/daily-record-lising', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/transection/daily-record-lising' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });