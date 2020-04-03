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
    

} from '@angular/material';

import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { IndexComponent } from './index/index/index.component';
import { UserChangpasswordComponent } from './user-changpassword/user-changpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';


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
        PagesRouterModule,
        FormsModule,
        ReactiveFormsModule,
    
    ],
    declarations: [
        ContactComponent,
        AboutComponent,
        ServicesComponent,
        IndexComponent,
        UserChangpasswordComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
