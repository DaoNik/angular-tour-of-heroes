import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = 'http://51.250.16.8:4500/login';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(this.url, user)
      .pipe(
        tap(this.setToken)
      )
  }

  setToken(response: any) {
    if (response) {
      localStorage.setItem('myToken', response.token);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    return localStorage.getItem('myToken');
  }
}
