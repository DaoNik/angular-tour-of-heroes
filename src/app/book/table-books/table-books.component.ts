import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BooksService } from '../books.service';
import { newBookSet } from '../books';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss']
})
export class TableBooksComponent implements OnInit {
  newSetBooks: newBookSet[] = [];
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  dataSource = this.newSetBooks;
  clickedRow?: newBookSet;

  constructor(private booksService: BooksService) { }

  getBooks(): void {
    this.booksService.getBooks().pipe(
      map(books => {
        const set1 = books.set1.data;
        const set2 = books.set2.data;
        return ({set1, set2});
      }),
      map(({set1, set2}) => {
        const newSetBooks: newBookSet[] = []
        for (let i = 0; i < set1.length; i++) {
          newSetBooks[i] = {
            id: set1[i].id,
            title: set1[i].title,
            description: set1[i].description,
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

  descriptionShow() {

  }

  ngOnInit(): void {
    this.getBooks()
  }
}
