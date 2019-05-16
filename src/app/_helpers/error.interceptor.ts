import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          catchError(err => {
          console.log('Error Interceptor: ' + err.error.error || err.error);
          console.log('Error Interceptor: ' + err.status);
          let error = err.error || err.statusText;

          if (err.status === 401 && err.error.error === 'Token is Expired') {
            error = 'Token está expirado';
            this.authenticationService.logout();
          }

          if (err.status === 401) {
            error = 'Função não autorizada';
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this.authenticationService.logout();
            //location.reload(true);
          }
          if (err.status === 400 && err.error.error === "Token is Invalid") {
            error = 'Token está inválido';
            this.authenticationService.logout();
            //location.reload(true);
          }

          return throwError(error);
        })
      )
  }
}
