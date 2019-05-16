import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { StoresService } from '@/_services';
import { Store } from '@/_models/store-model';

@Injectable({
  providedIn: 'root'
})
export class StoresResolverGuard implements Resolve<Store> {
  public store: Store = new Store();
  constructor(
    private compServ: StoresService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.params && route.params.id){
      return null //this.compServ.get(route.params.id);
    }
    return of(this.store);
  }


}
