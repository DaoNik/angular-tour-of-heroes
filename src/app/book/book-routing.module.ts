import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookContentComponent } from './book-content/book-content.component';
import { BookPage2Component } from './book-page2/book-page2.component';
import { BookPage3Component } from './book-page3/book-page3.component';
import { BookPage4Component } from './book-page4/book-page4.component';
import { BookPage5Component } from './book-page5/book-page5.component';
import { BookComponent } from './book/book.component';

export const bookRoutes: Routes = [
  {path: '',
   component: BookComponent,
   children: [
      {path: '', redirectTo: 'page1', pathMatch: 'full'},
      {path: 'page1', component: BookContentComponent},
      {path: 'page2', component: BookPage2Component},
      {path: 'page3', component: BookPage3Component},
      {path: 'page4', component: BookPage4Component},
      {path: 'page5', component: BookPage5Component}
   ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
