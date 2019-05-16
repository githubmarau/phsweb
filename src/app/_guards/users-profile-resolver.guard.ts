import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';
import { UsersService } from '@/_services';
import { User } from '@/_models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersProfileResolverGuard implements Resolve<User> {
  public user: User = new User();
  constructor(
    private service: UsersService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if(route.params && route.params.id){
      return this.service.getProfile(route.params.id);
    }
    //return of(this.user);
  }


}
