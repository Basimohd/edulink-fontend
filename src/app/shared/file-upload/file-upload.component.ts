import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilePond, FilePondFile, FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond';


 
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() options: FilePondOptions = {};
  @Input() pondFiles: FilePondOptions["files"] = [];
  @Output() fileAdded: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("myPond") myPond!: any;

  constructor() { }

  ngOnInit(): void {
  }

  pondHandleInit() {
    console.log("FilePond has initialised", this.myPond);
  }
  

  pondHandleAddFile(event: any) {
    this.fileAdded.emit(event);
  }
}
