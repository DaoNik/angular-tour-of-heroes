import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BooksService } from '../books.service';
import { bookSet1, bookSet2, newBookSet } from '../books';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss']
})
export class TableBooksComponent implements OnInit {
  newSetBooks: newBookSet[] = [];
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  clickedRow?: newBookSet;
  set1: bookSet1[] = [];
  set2: bookSet2[] = [];

  constructor(private booksService: BooksService) { }

  getBooks(): void {
    this.booksService.getSet1().pipe(
      map(dataSet1 => dataSet1.set1.data)
    ).subscribe(set1 => this.set1 = set1)
    this.booksService.getSet2().pipe(
      map(dataSet2 => dataSet2.set2.data),
      map(set2 => {
        const newSetBooks: newBookSet[] = [];
        for (let i = 0; i < set2.length; i++) {
          newSetBooks[i] = {
            id: this.set1[i].id,
            title: this.set1[i].title,
            description: this.set1[i].description,
            releaseDate: set2[i].releaseDate,
            qtyRelease: set2[i].qtyRelease
          }
        }
        return newSetBooks;
      })
    ).subscribe(books => this.newSetBooks = books)
  }

  getTotal(): number {
    return this.newSetBooks.map(book => book.qtyRelease).reduce((acc, value) => {
      return acc + value;
    }, 0)
  }

  ngOnInit(): void {
    this.getBooks()
  }
}
