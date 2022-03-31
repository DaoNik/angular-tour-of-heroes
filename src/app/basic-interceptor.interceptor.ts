import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BasicInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

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
