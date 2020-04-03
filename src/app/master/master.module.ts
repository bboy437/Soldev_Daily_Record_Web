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
import { MasterRouterModule } from './master.routes';
import { CoreModule } from '../core/core.module';

import { QuillModule } from 'ngx-quill';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';



import { UserChangpasswordComponent } from './user-changpassword/user-changpassword.component';
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityListingComponent } from './activity-listing/activity-listing.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';

@NgModule({
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
        MasterRouterModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        QuillModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        
    

    ],
    declarations: [
    
        UserChangpasswordComponent,
        WebDataRocksPivot,
        ActivityDetailComponent,
        ActivityListingComponent,
        CustomerDetailComponent,
        CustomerListingComponent,
        ProjectDetailComponent,
        ProjectListingComponent,
   
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
    entryComponents: []
})
export class MasterModule { }
