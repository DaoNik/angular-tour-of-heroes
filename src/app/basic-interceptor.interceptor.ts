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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('myToken')}`)
    });

    return next.handle(newReq)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => err);
      })
    );
  }
}
