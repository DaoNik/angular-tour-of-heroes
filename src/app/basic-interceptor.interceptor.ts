import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('myToken')) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('myToken')}`),
      })
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
