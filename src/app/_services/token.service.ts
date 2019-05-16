import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiUrl = `${environment.api_url}`;
  jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  handle(token) {
    this.set(token);
  }

  decodeToken(token: any){
//    console.log('PayLoad(decodeToken): ', this.jwtHelper.decodeToken(token));
    return this.jwtHelper.decodeToken(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid = () => {
    const token = this.get();
    if (token) {
      try {
        this.decodeToken(token)
        return true;
      } catch (err) {
        console.log('token inválido: ', err);
        return false;
      }
    }
  }

  isExpired = () => {
    const token = this.get();
    if(token) {
      try {
        // var current_time = Date.now() / 1000;
        // return this.payload(token).exp < current_time;
        return this.jwtHelper.isTokenExpired(token);
      } catch (err) {
        console.log('token expirado: ', err);
        return false;
      }
    }
  }
}
