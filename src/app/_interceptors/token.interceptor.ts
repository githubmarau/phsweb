import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split("/");
    const apiUrl: Array<any> = environment.api_url.split("/");

    const token = this.getToken();

    if (token && requestUrl[2] === apiUrl[2]) {
      const newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }

  private getToken(){
    return localStorage.getItem('token');
  }
}
