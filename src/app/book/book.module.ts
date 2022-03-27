import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

import { BookRoutingModule } from './book-routing.module';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book/book.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BookContentComponent } from './book-content/book-content.component';
import { BookPage2Component } from './book-page2/book-page2.component';
import { BookPage3Component } from './book-page3/book-page3.component';
import { BookPage4Component } from './book-page4/book-page4.component';
import { BookPage5Component } from './book-page5/book-page5.component';
import { TableBooksComponent } from './table-books/table-books.component';
import { BookChartComponent, DialogContent } from './book-chart/book-chart.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BookComponent,
    PaginationComponent,
    BookContentComponent,
    BookPage2Component,
    BookPage3Component,
    BookPage4Component,
    BookPage5Component,
    TableBooksComponent,
    BookChartComponent,
    DialogContent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule
  ],
})
export class BookModule { }
