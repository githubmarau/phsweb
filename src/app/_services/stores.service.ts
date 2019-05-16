import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from 'src/environments/environment';
import {catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@/_models/store-model';
import { IStore } from '@/_models/istore-model';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  apiUrl = `${environment.api_url}/stores`;
  store: Store;
  list: IStore[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ){}

  // get(id: number): Observable<any> {
  //   this.spinner.show();
  //   return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
  //     tap(data => {
  //       this.spinner.hide();
  //     }),
  //     catchError(err => {
  //       this.spinner.hide();
  //       this.toastr.error('Erro ao obter registro', 'Lojas');
  //       return of([]);
  //     })
  //   );
  // }

  getAll(): Observable<IStore[]> {
    this.spinner.show();
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      tap(data => {
        console.log('getAllStore', data);
        this.list = data as IStore[];
        this.spinner.hide();
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao obter registros', 'Lojas');
        return of([]);
      })
    );
  }

  create(data: any): Observable<any>{
    this.spinner.show();
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(
      tap(resp => {
        this.list.push(resp.store as IStore);
        this.spinner.hide();
        this.toastr.success('Registro criado com sucesso', 'Lojas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao criar registro', 'Lojas');
        return of([]);
      })
    );
  }

  update(data: any): Observable<any>{
    this.spinner.show();
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data).pipe(
      tap(resp => {
        console.log('UpdateStore', resp);
        let itemIndex = this.list.findIndex(item => resp.store.id == item.id);
        this.list[itemIndex] = resp.store as IStore;
        this.spinner.hide();
        this.toastr.info('Registro atualizado com sucesso', 'Lojas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao atualizar registro', 'Lojas');
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
        this.toastr.warning('Registro deletado com sucesso', 'Lojas');
      }),
      catchError(err => {
        this.spinner.hide();
        this.toastr.error('Erro ao deletar registro', 'Lojas');
        return of([]);
      })
    );
  }
}
