import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { AuthService } from './auth/service/auth.service';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { GlobalsValue } from '../app/globals.value';
import { BrokerAPIService } from './services/brokerapi.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmDeleteDialogComponent } from './dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


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
  MatDatepickerModule,
  MatAutocompleteModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,


} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    ConfirmDeleteDialogComponent,
    MessageDialogComponent,
   


  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    FlexLayoutModule,
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
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    GlobalsValue,
    BrokerAPIService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },

  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    MessageDialogComponent
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
