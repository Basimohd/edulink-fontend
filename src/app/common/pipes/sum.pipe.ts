import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(value: number[]): string {
    const sum = value.reduce((acc, num) => acc + parseInt(String(num), 10), 0); 
    return sum.toString()
  }
}