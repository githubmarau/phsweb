import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxModule } from 'angular-admin-lte';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModule } from '../shared/confirm/confirm.module';

import { StoresRoutingModule } from './stores-routing.module';
import { StoreFormComponent } from './store-form/store-form.component';
import { StoreListComponent } from './store-list/store-list.component';

@NgModule({
  declarations: [StoreFormComponent, StoreListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    BoxModule,
    ModalModule.forRoot(),
    ConfirmModule,
    StoresRoutingModule,
  ],
  entryComponents: [StoreFormComponent],
})
export class StoresModule { }
