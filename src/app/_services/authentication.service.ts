import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../../web-ngx/src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '@/_services/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '@/_models/user-model';
import { Role } from '@/_models/role-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api_url = `${environment.api_url}/auth`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isAdmin() {
    return this.currentUserValue && this.currentUserValue.role === Role.Admin;
  }

  public login(credential: any){
    this.spinner.show();
    return this.http.post<any>(`${this.api_url}/login`, credential).pipe(
      map(data => {
        //console.log('login', data);
//        if(data.user && data.token && data.store) {
        if(data.user && data.token) {
            const user = new User(data.user);
          user.token = data.token;
          // user.current_store_id = data.store.id;
          // user.current_store_name = data.store.name;
          //user.stores = data.stores.map(data => new Store().deserialize(data));
          console.log(user);

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', data.token);
          // localStorage.setItem('sId', data.store.id);
          // localStorage.setItem('sNm', data.store.name);
          this.currentUserSubject.next(user);
          this.spinner.hide();
        }
      }),
      catchError(() => { this.spinner.hide(); return throwError('Autenticação inválida'); })
      );
  }

  public logout() {
    ///////////////////  tem que melhorar  --- fazer logout pela API
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);

    // return this.http.post(`${this.api_url}/logout`, {})
    //   .pipe(
    //     tap(),
    //     take(1))
    //   .subscribe(() => {
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //   }
    //   //() => this.router.navigate(['/login']));

  }

  public isLoggedIn() {
    return this.tokenService.isValid();
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }


}
