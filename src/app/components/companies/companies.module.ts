import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxModule } from 'angular-admin-lte';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { ConfirmModule } from './../shared/confirm/confirm.module';
import { StoresModule } from '../stores/stores.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    BoxModule,
    ModalModule.forRoot(),
    ConfirmModule,
    StoresModule,
  ],
  exports: [CompanyListComponent],
  entryComponents: [CompanyFormComponent],
})
export class CompaniesModule { }
