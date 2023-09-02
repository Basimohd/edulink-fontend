import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { admissionService } from '../../user/services/admission.service';
import { AdmissionMessageService } from '../../user/services/admission-message.service';
import { studentService } from '../../user/services/student.service';
import { admissionStatus } from '../../user/components/admission-status/admission.enum';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

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
        console.log(userDetails);
        
        if (userDetails?.admssionDetails && userDetails.admssionDetails.admissionStatus == admissionStatus.APPROVED) {
          console.log("asdf");
          
          return true
        } else {    
          console.log("asfd");
          
          this.router.navigate(['admission'])
          return false;
        }
      })
      .catch((error) => {
        console.log(error);

        this.router.navigate(['admission'])
        return false;
      });
  }

  private checkUserToken(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }
}