import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { admissionService } from '../services/admission.service';
import { AdmissionMessageService } from '../services/admission-message.service';
import { studentService } from '../../user/services/student.service';

@Injectable({
  providedIn: 'root'
})
export class AdmissionGuard implements CanActivate {

  constructor(
    private admissionService: admissionService,
    private router: Router,
    private studentService: studentService,
      private admissionMessageService: AdmissionMessageService) { }

  canActivate(): Promise<boolean> {
    const userId = localStorage.getItem('userId') as string;
    const hasToken = this.checkUserToken();

    if (!hasToken) {
      this.router.navigate(['/register']);
      return Promise.resolve(false);
    }

    return this.studentService.getUserDetails(userId).toPromise()
      .then((userDetails) => {
        if (userDetails && userDetails.admssionDetails) {
          this.router.navigate(['/admission-status']);
          this.admissionMessageService.setAdmissionMessage('You have already taken an admission enquiry.');
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  }

  private checkUserToken(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }
}