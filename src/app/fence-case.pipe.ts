import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fenceCase'
})
export class FenceCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value
      .split(' ')
      .map((word) => {
        let newWord = ''
        for (let i = 0; i < word.length; i++) {
          newWord += i % 2 === 0 ? word[i].toUpperCase() : word[i]
        }
        return newWord;
      })
      .join(' ');
  }

}

