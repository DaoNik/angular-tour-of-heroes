import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { BooksService } from '../books.service';
import { bookSet1, bookSet2, newBookSet } from '../books';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableBooksComponent implements OnInit {
  newSetBooks: newBookSet[] = [];
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  clickedRow?: newBookSet;
  set1: bookSet1[] = [];
  set2: bookSet2[] = [];
  expandedElement: newBookSet | null = null;

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

  getHeaderContent(column: string) {
    if (column === 'id') {
      return 'Id';
    } else if (column === 'qtyRelease') {
      return 'Тираж шт.';
    }
    return 'Название';
  }

  getFooterContent(column: string) {
    if (column === 'id') {
      return 'Итого продано'
    } else if (column === 'qtyRelease') {
      return this.getTotal();
    }
    return '';
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
