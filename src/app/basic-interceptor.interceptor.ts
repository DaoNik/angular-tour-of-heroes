import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './_helpers/authentication.service';

@Injectable()
export class BasicInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('myToken')) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('myToken')}`),
      })
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !localStorage.getItem('myRefreshToken')) {
            console.log('401 и нет рефреш токена')
            this.auth.logout();
            this.router.navigate(['/login']);
          } else if (error.status === 401) {
            this.auth.logout();

            return this.auth.refreshToken(localStorage.getItem('myRefreshToken')!).pipe(
              switchMap((res) => {
                localStorage.setItem('myToken', res.token);

                return next.handle(
                  request.clone({
                    headers: request.headers.set(
                      'Authorization', `Bearer ${res.token}`
                    ),
                  })
                )
              }),
              catchError((err) => {
                this.auth.logout();

                return throwError(() => new Error(`Interceptor Error: ${err.message}`));
              })
            )
          }

          return throwError(() => new Error(`Interceptor Error: ${error.message}`))
        })
      )
    }
    return next.handle(request);
  }
}
