import { DOCUMENT } from '@angular/common';
import { Component, Directive, Injectable, Inject, ElementRef } from '@angular/core';
import { merge, defer, distinctUntilChanged, fromEvent, Observable, of, map } from 'rxjs';

@Directive({selector: '.focus'})
export class ChildDirective {
}

@Component({
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.scss']
})
@Injectable()
export class FocusComponent extends Observable<Element | null> {
  element: any;

  constructor(
    @Inject(DOCUMENT) documentRef: Document,
    { nativeElement }: ElementRef<HTMLElement>
  ) {
    const focusedElement$ = merge(
      defer(() => of(documentRef.activeElement)),
      fromEvent(nativeElement, 'focusin').pipe(map(({target}) => target)),
      fromEvent(nativeElement, 'focusout').pipe(
        map(({ target }) => target)
      )
    ).pipe(
      map(element => {
        return element && nativeElement.contains((element as Element)) ? element : null;
      }),
      distinctUntilChanged(),
    );

    super(subscriber => {
      if (subscriber) {
        // focusedElement$.subscribe(subscriber)
      }
    })

    focusedElement$.subscribe({
      next: (value) => {
        this.element = value;
      }
    })
  }
}
