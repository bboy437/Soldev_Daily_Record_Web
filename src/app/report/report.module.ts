
import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatRadioModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,

    
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { ReportRouterModule } from './report.routes';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MonthlyReportListingComponent } from './monthly-report-listing/monthly-report-listing.component';
import { MonthlyReportDetailComponent } from './monthly-report-detail/monthly-report-detail.component';


@NgModule({

  declarations: [
  WebDataRocksPivot,
  MonthlyReportListingComponent,
  MonthlyReportDetailComponent,
],

  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    CoreModule,
    ReportRouterModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule
    
   
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule
],

  providers: [],
 
})


export class ReportModule { }
