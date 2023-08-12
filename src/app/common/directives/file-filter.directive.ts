import { Directive, Input, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appFileUploadValidator]'
})
export class FileUploadValidatorDirective {

  @Input() maxSizeMB: number = 5;
  @Input() allowedFormats: string[] = ['jpg', 'jpeg', 'png', 'gif'];
  @Output() validationMessage = new EventEmitter<string>();
  @Output() uploadImage = new EventEmitter<File>();
  constructor(private el: ElementRef) { }

  @HostListener('change') onFileChange(): void {
    const file: File = this.el.nativeElement.files[0];


      if (file) {
        const fileSizeMB = file.size / (1024 * 1024);
        const img = new Image();
  
        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;
          const aspectRatio = imgWidth / imgHeight;
  
          const aspectRatioTolerance = 0.05;
  
          if (
            fileSizeMB <= this.maxSizeMB &&
            Math.abs(aspectRatio - 0.75) <= aspectRatioTolerance
          ) {
            const fileExt = file.name.split('.').pop()?.toLowerCase();
            if (this.allowedFormats.includes(fileExt as string)) {
              this.uploadImage.emit(file)
            } else {
              const message = `Invalid file format. Allowed formats: ${this.allowedFormats.join(', ')}`;
              this.validationMessage.emit(message);
            }
          } else {
            const message = `Invalid file size or aspect ratio. Max size: ${this.maxSizeMB} MB, Aspect ratio: 3:4 (approx)`;
            this.validationMessage.emit(message);
          }
        };
  
        img.onerror = () => {
          const message = 'Error loading image.';
          this.validationMessage.emit(message);
        };
  
        img.src = URL.createObjectURL(file);
      }
    }
  }