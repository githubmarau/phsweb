import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: any[] = [];

  constructor(private auth: AuthenticationService) {}

  makeMenu(menu: any[]): Observable<any>{
    console.log('makeMenu');
    menu.forEach(item => {
      if(item.can )
      {
        // Somente usuário permitido
        if(this.auth.currentUserValue.role === item.can)
        {
          this.menu.push(item);
        }
      }
      // Todos os usuários têm permissão
      else
      {
        this.menu.push(item);
      }
    })
    return of(this.menu);
  }
}
