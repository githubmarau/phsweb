import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, of, Subject } from "rxjs";
import { Company } from '@/_models/company-model';
import { User } from "@/_models/user-model";
import { Store } from "@/_models/store-model";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  readonly apiUrl = `${environment.api_url}/users`;
  user: User;
  stores: Store[];
  list: User[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  get(id: number): Observable<any> {
    this.spinner.show();
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(data => {
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter registro', 'Usuários');
        return of([]);
      })
    );
  }

  getProfile(id: number): Observable<any> {
    this.spinner.show();
    return this.http.get<any>(`${this.apiUrl}/${id}/profile`).pipe(
      tap(data => {
        console.log('getProfile', data);
        this.user = new User(data);
        // this.user.companies.forEach(item => {
        //   let stores = item.stores as Store[];
        //   this.stores.push(stores);
        // });
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter Perfil', 'Usuários');
        return of([]);
      })
    );
  }

  getAll(): Observable<User[]> {
    this.spinner.show();
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      tap(data => {
        this.list = data.map(data => new User(data));
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter registros', 'Usuários');
        return of([]);
      })
    );
  }

  create(data: any): Observable<any>{
    this.spinner.show();
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(
      tap(resp => {
        this.list.push(new User(resp.user));
        this.spinner.hide();
        this.toastr.success('Registro criado com sucesso', 'Usuários');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao criar registro', 'Usuários');
        return of([]);
      })

    );
  }

  updatePassword(data: any): Observable<any>{
    this.spinner.show();
    return this.http.put(`${this.apiUrl}/${data.id}/password`, data).pipe(
      tap(resp => {
        this.spinner.hide();
        this.toastr.success('Senha criada/atualizada com sucesso', 'Usuário - Senha');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao atualizar senha', 'Usuário - Senha');
        return of([]);
      })
    );
  }

  update(data: any): Observable<any>{
    this.spinner.show();
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data).pipe(
      tap(resp => {
        let itemIndex = this.list.findIndex(item => resp.user.id == item.id);
        this.list[itemIndex] = new User(resp.user);
        this.spinner.hide();
        this.toastr.info('Registro atualizado com sucesso', 'Usuários');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao atualizar registro', 'Usuários');
        return of([]);
      })
    );
  }

  delete(id: number): Observable<any>{
    this.spinner.show();
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(resp => {
        let itemIndex = this.list.findIndex(item => id == item.id);
        this.list.splice(itemIndex, 1);
        this.spinner.hide();
        this.toastr.warning('Registro deletado com sucesso', 'Usuários');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao deletar registro', 'Usuários');
        return of([]);
      })
    );
  }
}
