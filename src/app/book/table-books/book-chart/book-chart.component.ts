import { Component, OnInit, ElementRef, ViewChild, DoCheck } from '@angular/core';
import Chart from 'chart.js/auto';
import { map } from 'rxjs';
import { bookSet1, bookSet2 } from '../../books';
import { BooksService } from '../../book.service';


@Component({
  selector: 'app-book-chart',
  templateUrl: './book-chart.component.html',
  styleUrls: ['./book-chart.component.scss']
})
export class BookChartComponent implements OnInit, DoCheck {
  @ViewChild('myCanvas')
  private myCanvas!: ElementRef;
  barChart: any;

  set1: bookSet1[] = [];
  set2: bookSet2[] = [];
  titles: string[] = [];
  quantity: number[] = [];
  isRender: boolean = false;

  constructor(private booksService: BooksService) {  }

  getBooks(): void {
    this.booksService.getSet1().pipe(
      map(dataSet1 => dataSet1.set1.data),
      map(set1 => {
        const titles: string[] = [];
        set1.forEach(book => {
          titles.push(book.title);
        })
        return titles;
      })
    ).subscribe(titles => this.titles = titles)

    this.booksService.getSet2().pipe(
      map(dataSet2 => dataSet2.set2.data),
      map(set2 => {
        const quantity: number[] = [];
        set2.forEach(book => {
          quantity.push(book.qtyRelease);
        })
        return quantity;
      })
    ).subscribe(quantity => this.quantity = quantity)
  }

  ngOnInit(): void {
    this.getBooks();
    console.log(this.titles);
  }

  ngDoCheck() {
    if (this.quantity && this.quantity.length !== 0 && !this.isRender) {
      console.log(this.titles, this.quantity);
      this.isRender = true;
      this.barChartMethod();
    }
  }

  barChartMethod() {
    this.barChart = new Chart(this.myCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: this.titles,
          datasets: [{
              label: 'Проданные книги',
              data: this.quantity,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                beginAtZero: true
              }
          }
      }
  });
  }
}
