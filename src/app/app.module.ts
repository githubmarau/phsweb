import { MenuService } from '@/_services/menu.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule as NgxToastrModule,
  ToastrService as NgxToastrService } from "ngx-toastr";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';


import { adminLteConf } from './admin-lte.conf';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { LayoutModule } from 'angular-admin-lte';

import { UsersModule } from './components/users/users.module';
import { HttpInterceptorsProviders } from './_helpers';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardModule } from './components/dashboards/dashboard.module';
import { CompaniesModule } from './components/companies';

registerLocaleData(localePtBr, 'pt');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingPageModule, MaterialBarModule,
    LayoutModule.forRoot(adminLteConf),
    ModalModule.forRoot(),
    NgxToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule,
    UsersModule,
    CompaniesModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    HttpInterceptorsProviders,
    NgxToastrService,
    NgxSpinnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
