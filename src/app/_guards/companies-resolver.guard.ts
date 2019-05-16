import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { CompaniesService } from '@/_services';
import { Company } from '@/_models/company-model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesResolverGuard implements Resolve<Company> {
  public company: Company = new Company();
  constructor(
    private service: CompaniesService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.params && route.params.id){
      return this.service.getDetails(route.params.id);
    }
    return of(this.company);
  }


}
