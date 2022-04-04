import {TableBooksComponent} from "./table-books.component";
import {BooksService} from "../book.service";
import { ComponentFixture, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BookDialogComponent} from "./book-dialog/book-dialog.component";
import {BookChartComponent} from "./book-chart/book-chart.component";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {InjectionToken} from "@angular/core";

describe('TableBooks component', () => {
  let fixture: ComponentFixture<TableBooksComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [TableBooksComponent, BookDialogComponent, BookChartComponent],
      providers: [BooksService, MatDialog, Overlay]
    })

    fixture = TestBed.createComponent(TableBooksComponent)
  })

  it('should get books from BooksService getBooks', waitForAsync(() => {
    const comp = fixture.componentInstance
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      expect(comp.newSetBooks[1]).toBe({id: 2, title: 'The Hunger Games', description: 'Could you survive on your own in the wild, with ev… survival against humanity and life against love.', releaseDate: "2011-01-03", qtyRelease: 7500})
    })
  }))
})
