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
  isRefreshing = false;
  constructor(private router: Router, private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('myToken')}`)
    });

    return next.handle(newReq)
    .pipe(
      catchError((err) => {
        if (err.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.refreshToken(localStorage.getItem('myRefreshToken')!)
            .pipe(
              switchMap((res: any) => {
                localStorage.setItem('myToken', res.token);
                return next.handle(
                  req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${res.token}`),
                  })
                );
              }),
              catchError((err) => {
                this.auth.logout();
                return throwError(() => err);
              })
            );
        }
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigate(['login'])
        }

        return throwError(() => err);
      })
    );
  }
}
