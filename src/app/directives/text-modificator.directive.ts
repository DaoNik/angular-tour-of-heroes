import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextModificator]'
})
export class TextModificatorDirective{
  startText: string = '';
  startBackground: string = '';
  constructor(private element: ElementRef, private renderer: Renderer2){
  }

  @HostListener("mouseenter") onMouseEnter() {
      this.setBackground("rgb(241, 192, 68)");
      this.setText(' Don\'t worry. Be happy!')
  }

  @HostListener("mouseleave") onMouseLeave() {
      this.setBackground("");
      this.setText('')
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
