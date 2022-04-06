import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {bookDataSet1, bookDataSet2, books} from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = 'http://51.250.16.8:4500/books';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getSet1(): Observable<books> {
    return this.http.get<books>(this.booksUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched set1')),
        // catchError(this.handleError<bookDataSet1>('getSet1', {}))
      )
  }

  getSet2(): Observable<books> {
    return this.http.get<books>(this.booksUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched set2')),
        // catchError(this.handleError<bookDataSet2>('getSet1', {}))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
