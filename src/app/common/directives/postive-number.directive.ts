import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPositiveNumber]'
})
export class PositiveNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;

    // Remove non-numeric characters except for '-' at the start
    const sanitizedValue = inputValue.replace(/[^0-9-]/g, '');

    // If there's a '-' not at the start, remove it
    const valueWithoutExtraMinus = sanitizedValue.replace(/(?<=^.*)-/, '');

    // Remove leading zeros
    const trimmedValue = valueWithoutExtraMinus.replace(/^0+/, '');
    console.log(trimmedValue);
    
    // Update the input value
    inputElement.value = trimmedValue;
  }
}