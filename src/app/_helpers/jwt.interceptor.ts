import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService, AuthenticationService } from '@/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private auth: AuthenticationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.tokenService.isValid()){
      this.auth.logout();
    }

    if(this.tokenService.isExpired()){
      this.auth.logout();
    }


    // add authorization header with jwt token if available
    let token = this.tokenService.get();

    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next.handle(request);
  }
}
