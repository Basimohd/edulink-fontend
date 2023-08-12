import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmissionMessageService {
  
  private admissionMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  admissionMessage$: Observable<string> = this.admissionMessageSubject.asObservable();

  setAdmissionMessage(message: string): void {
    this.admissionMessageSubject.next(message);
  }
}