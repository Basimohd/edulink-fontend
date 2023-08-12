import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragNDropDirective {
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#F9FAFB';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e:any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#e8e9eb'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e:any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#F9FAFB'
  }

  @HostListener('drop', ['$event']) public onDrop(e:any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#F9FAFB';

    let files = e.dataTransfer.files;
    this.filesChangeEmiter.emit(Array.from(files));
  }
}