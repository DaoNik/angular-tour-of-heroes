import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {bookDataSet1, bookDataSet2} from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private set1Url = 'api/set1';
  private set2Url = 'ape/set2';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getSet1(): Observable<bookDataSet1> {
    return this.http.get<bookDataSet1>(this.set1Url)
      .pipe(
        tap(_ => console.log('fetched set1')),
        // catchError(this.handleError<bookDataSet1>('getSet1', {}))
      )
  }

  getSet2(): Observable<bookDataSet2> {
    return this.http.get<bookDataSet2>(this.set2Url)
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
