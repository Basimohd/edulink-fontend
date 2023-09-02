
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart'
})
export class PadStartPipe implements PipeTransform {

  transform(value: string, paddingCharacter: string): string {
    return `${paddingCharacter.repeat(2 - value.length)}${value}`;
  }

}
