import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book/book.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BookContentComponent } from './book-content/book-content.component';
import { BookPage2Component } from './book-page2/book-page2.component';
import { BookPage3Component } from './book-page3/book-page3.component';
import { BookPage4Component } from './book-page4/book-page4.component';
import { BookPage5Component } from './book-page5/book-page5.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BookComponent,
    PaginationComponent,
    BookContentComponent,
    BookPage2Component,
    BookPage3Component,
    BookPage4Component,
    BookPage5Component
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ],
  exports: [
    BookComponent
  ]
})
export class BookModule { }