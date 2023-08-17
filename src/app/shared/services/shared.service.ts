
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFileService {
  private updateFilesSubject = new Subject<void>();

  updateFiles() {
    this.updateFilesSubject.next();
  }

  get updateFiles$() {
    return this.updateFilesSubject.asObservable();
  }
}