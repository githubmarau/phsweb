import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { UrlInterceptor } from './url.interceptor';

// export { ErrorInterceptor } from './error.interceptor';
// export { JwtInterceptor } from './jwt.interceptor';


export const HttpInterceptorsProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  // Não está funcionando, entao defino a loja no proprio componente
  //{provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true},
];
