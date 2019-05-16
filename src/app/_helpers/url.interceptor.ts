import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/_services';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let urlParams = request.params;
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        console.log('UrlInterceptor: ' + request.params.toString());
        request.params.append('loja', currentUser.current_store_id.toString());
      }

      //const newReq = request.clone({params: urlParams});

      //console.log('UrlInterceptor: ' + urlParams);

      return next.handle(request);
    }
}
