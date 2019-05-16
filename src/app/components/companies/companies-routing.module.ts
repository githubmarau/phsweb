import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompaniesResolverGuard } from '@/_guards';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  {path: '', component: CompanyListComponent},
  {
    path: 'details/:id',
    component: CompanyDetailsComponent,
    data: {title: 'Detalhes'},
    //resolve: {company: CompaniesResolverGuard}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
