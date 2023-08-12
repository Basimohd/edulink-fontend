import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDuration]'
})
export class DurationDirective {
  constructor() { }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    console.log(event);
  }
}