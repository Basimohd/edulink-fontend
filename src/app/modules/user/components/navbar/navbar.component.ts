import { Component, HostListener } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AdmissionGuard } from '../../guards/admission.guard';
import { Router } from '@angular/router';
import { studentService } from '../../services/student.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faUser = faCircleUser;
  faRightToBracket = faRightFromBracket
  userDetails!: any;
  isDropDown : boolean = false;
  adimssion:boolean = false;
  private readonly userId = localStorage.getItem('userId')

  constructor(
    private authguard: AdmissionGuard,
    private router: Router,
    private studentService: studentService,

  ) {
    if (this.userId) {
      this.studentService.getUserDetails(this.userId).subscribe((res: any) => {
        if (res.admssionDetails) {
          this.adimssion = true
        }else{
          this.adimssion = false
        }
      })
    }
   }

  isStudentLogin(): boolean {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  isFacultyLogin(): boolean {
    const token = localStorage.getItem('facultyToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  onLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/'])
  }
  onDropDown(){
    this.isDropDown = !this.isDropDown
  }

  navbg : any;

@HostListener('document:scroll') scrollover(){
  if(document.body.scrollTop>0 || document.documentElement.scrollTop > 0){
    this.navbg  = {
      'background-color':'rgb(250,250,250)',
      'border-bottom-width': '1px',
      '--tw-border-opacity': '1',
      'border-color':' rgb(229 231 235 / var(--tw-border-opacity))'
    }
  }else{
    this.navbg  = {
      'top':'.5rem',
      'background-color':'transparent'
    }
  }
}

}

