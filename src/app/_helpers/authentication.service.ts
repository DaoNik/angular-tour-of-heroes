import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = 'http://51.250.16.8:4500/';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(`${this.url}login`, user)
      .pipe(
        tap(this.setToken),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(() => error);
        })
      )
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.url}register`, user)
      .pipe(
        tap(this.setUser)
      )
  }

  refreshToken(token: string): Observable<any> {
    console.log('Запрос на обновление токена', token);
    return this.http.post(`${this.url}update`, { refreshToken: token})
      .pipe(
        tap(this.setToken)
      )
  }

  setToken(response: any) {
    if (response) {
      const oneMinute = 1000 * 60;
      const expiresDate = new Date(new Date().getTime() + oneMinute);
      localStorage.setItem('myToken', response.token);
      localStorage.setItem('date', expiresDate.toString());
      if (response.refreshToken != null) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }
    }
  }

  setUser(response: any) {
    if (response) {
      localStorage.setItem('user', response)
    }
  }

  logout() {
    localStorage.removeItem('myToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('date');
  }
}
