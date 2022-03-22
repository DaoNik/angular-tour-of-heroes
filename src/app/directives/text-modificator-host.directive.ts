import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextModificatorHost]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class TextModificatorHostDirective {
  startText: string = '';
  startBackground: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  onMouseEnter() {
    this.setBackground("rgb(241, 192, 68)");
    this.setText('. Don\'t worry. Be happy!');
  }

  onMouseLeave() {
    this.setBackground('');
    this.setText('');
  }

  private setBackground(val: string) {
    if (val === '') {
      this.renderer.setStyle(this.element.nativeElement, "background-color", this.startBackground);
    } else {
      this.startBackground = this.element.nativeElement.style.backgroundColor;
      this.renderer.setStyle(this.element.nativeElement, "background-color", val);
    }
  }

  private setText(val: string) {
    if (val === '') {
      this.element.nativeElement.textContent = this.startText;
    } else {
      this.startText = this.element.nativeElement.textContent;
      this.element.nativeElement.textContent += val;
    }
  }
}
