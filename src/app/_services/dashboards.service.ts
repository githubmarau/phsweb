import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dashboard } from '@/_models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {
  public api_url = `${environment.api_url}/admin/dashboard`;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ){}

  get(queryParams: any = {}): Observable<any>{
    const options = {
      params: new HttpParams()
      .append('loja', queryParams.loja)
      .append('date_initial', queryParams.date_initial)
      .append('date_final', queryParams.date_final)
    };
    this.spinner.show();

    console.log(options.params.toString());
//    return this.http.get<any>(`${this.api_url}?date_initial=24.07.2018&date_final=24.07.2018&loja=1`).pipe(
    return this.http.get<any>(`${this.api_url}`, options).pipe(
      map(data => { this.spinner.hide(); return new Dashboard().deserialize(data); }),
      catchError(() => { this.spinner.hide(); return throwError('Dados não encontrados'); })
    );
  }
}
