import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
        tap(this.setToken)
      )
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.url}register`, user)
      .pipe(
        tap(this.setUser)
      )
  }

  setToken(response: any) {
    if (response) {
      localStorage.setItem('myToken', response.token);
    }
  }

  setUser(response: any) {
    if (response) {
      localStorage.setItem('user', response)
    }
  }

  get token() {
    return localStorage.getItem('myToken');
  }
}
