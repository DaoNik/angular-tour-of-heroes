import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {Books, bookSet1} from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = 'api/books';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books> {
    return this.http.get<Books>(this.booksUrl)
      .pipe(
        tap(_ => console.log('fetched book')),
        // catchError(this.handleError<Books>('getBooks', {}))
      )
  }

  getBook(id: number): Observable<bookSet1> {
    const url = `${this.booksUrl}/set2/data/${id}`;
    return this.http.get<bookSet1>(url).pipe(
      tap(_ => console.log(`fetched book id=${id}`)),
      catchError(this.handleError<bookSet1>(`getBook id=${id}`))
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
