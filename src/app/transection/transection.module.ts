
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

import { TransectionRouterModule } from './transection.routes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DailyRecordLisingComponent } from './daily-record-lising/daily-record-lising.component';
import { DailyRecordDialgComponent } from './daily-record-lising/dialog/daily-record-dialg/daily-record-dialg.component';

@NgModule({

  declarations: [
    DailyRecordLisingComponent,
    DailyRecordDialgComponent
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
    TransectionRouterModule,
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
  entryComponents: [DailyRecordDialgComponent]
 
})


export class TransectionModule { }
