import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@/_models/store-model';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './authentication.service';
import { Company } from '@/_models/company-model';
import { User } from '@/_models/user-model';
import { ICompany } from '@/_models/icompany-model';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {
  public apiUrl = `${environment.api_url}/companies`;
  company: Company;
  list: ICompany[] = [];
  listStores: Store[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
  ){}

  // get(id: number): Observable<any> {
  //   this.spinner.show();
  //   return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
  //     tap(data => {
  //       this.spinner.hide();
  //     }),
  //     catchError(err => {
  //       this.spinner.hide();
  //       this.toastr.error('Erro ao obter registro', 'Empresas');
  //       return of([]);
  //     })
  //   );
  // }

  getDetails(id: number): Observable<any> {
    this.spinner.show();
    return this.http.get<any>(`${this.apiUrl}/${id}/details`).pipe(
      tap(data => {
        this.company = new Company(data);
        console.log('getdetails', this.company);
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter Perfil', 'Empresas');
        return of([]);
      })
    );
  }

  getAll(): Observable<ICompany[]> {
    this.spinner.show();
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      tap(data => {
        console.log('getAllCompany: ', data);
        this.list = data as ICompany[];
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter registros', 'Empresas');
        return of([]);
      })
    );
  }

  // getStores(id: number) {
  //   this.spinner.show();
  //   return this.http.get<any[]>(`${this.apiUrl}/${id}/stores`).pipe(
  //     tap(data => {
  //       this.listStores = data.map(data => new Store(data));
  //       this.spinner.hide();
  //     }),
  //     catchError(err => {
  //       this.spinner.hide();
  //       this.toastr.error('Erro ao obter registros', 'Empresas');
  //       return of([]);
  //     })
  //   );
  // }

  create(data: any): Observable<any>{
    this.spinner.show();
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(
      tap(resp => {
        this.list.push(resp.company as ICompany);
        this.spinner.hide();
        this.toastr.success('Registro criado com sucesso', 'Empresas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao criar registro', 'Empresas');
        return of([]);
      })
    );
  }

  update(data: Company): Observable<any>{
    this.spinner.show();
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data).pipe(
      tap(resp => {
        console.log('UpdateCompany', resp);
        let itemIndex = this.list.findIndex(item => resp.company.id == item.id);
        this.list[itemIndex] = resp.company as ICompany;
        this.spinner.hide();
        this.toastr.info('Registro atualizado com sucesso', 'Empresas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao atualizar registro', 'Empresas');
        return of([]);
      })
    );
  }

  delete(id: number): Observable<any>{
    this.spinner.show();
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(resp => {
        let itemIndex = this.list.findIndex(item => item.id == id);
        this.list.splice(itemIndex, 1);
        this.spinner.hide();
        this.toastr.warning('Registro deletado com sucesso', 'Empresas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao deletar registro', 'Empresas');
        return of([]);
      })
    );
  }

}
