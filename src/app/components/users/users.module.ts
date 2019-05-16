import { CompaniesModule } from './../companies/companies.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { BoxModule } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import {
  UserListComponent,
  UserFormComponent,
  UserProfileComponent} from './';
import { UsersRoutingModule } from './users-routing.module';
import { UserPasswordComponent } from './user-password/user-password.component';
import { ConfirmModule } from '../shared/confirm/confirm.module';
//import { StoresModule } from '../stores/stores.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserFormComponent,
    UserPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BoxModule,
    ModalModule.forRoot(),
    DataTablesModule,
    CoreModule,
    UsersRoutingModule,
    LoadingPageModule,
    MaterialBarModule,
    ConfirmModule,
    CompaniesModule,
    //StoresModule,
  ],
  providers: [BsModalService],
  entryComponents: [UserPasswordComponent, UserFormComponent],
})
export class UsersModule { }
