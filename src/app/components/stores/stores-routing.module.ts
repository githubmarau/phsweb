import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
// import { CompaniesComponent } from './companies.component';
// import { CompanyDetailsComponent } from './company-details/company-details.component';
// import { CompaniesResolverGuard } from '@/_guards';

const routes: Routes = [
  {path: '', component: StoreListComponent},
  // {
  //   path: 'details/:id',
  //   component: CompanyDetailsComponent,
  //   data: {title: 'Detalhes'},
  //   //resolve: {company: CompaniesResolverGuard}
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
