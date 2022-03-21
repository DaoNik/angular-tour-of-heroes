import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fenceCase'
})
export class FenceCasePipe implements PipeTransform {


  transform(value: string): string {
    let newValue = '';
    let isUpper = false;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === ' ') {
        newValue += ' ';
        continue;
      }
      newValue += isUpper ? value[i] : value[i].toUpperCase();
      isUpper = !isUpper;
    }
    return newValue;
  }

}

