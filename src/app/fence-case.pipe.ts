import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fenceCase'
})
export class FenceCasePipe implements PipeTransform {


  transform(value: string, ...args: unknown[]): string {
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

    // return value
    //   .split(' ')
    //   .map((word) => {
    //     let newWord = ''
    //     for (let i = 0; i < word.length; i++) {
    //       newWord += i % 2 === 0 ? word[i].toUpperCase() : word[i]
    //     }
    //     return newWord;
    //   })
    //   .join(' ');
  }

}

