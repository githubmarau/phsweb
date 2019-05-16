import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService, TokenService } from '@/_services';
import { Role } from '@/_models/role-model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    console.log('canActivate');

    if (this.authenticationService.isLoggedIn()
      && !this.tokenService.isExpired()
      && this.tokenService.isValid()) {

      console.log('está autenticado');
      console.log('papel rota', route.data.roles);
      console.log('papel user', currentUser.role);

      if(currentUser.role === Role.Admin){
        return true;
      }
      // check if route is restricted by role
      if (route.data.roles
        && route.data.roles.indexOf(currentUser.role) === -1) {

        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    console.log('canActivateChild');

    if (this.authenticationService.isLoggedIn()
      && !this.tokenService.isExpired()
      && this.tokenService.isValid()) {

      console.log('está autenticado');
      console.log('papel rota', route.data.roles);
      console.log('papel user', currentUser.role);

      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {

        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
