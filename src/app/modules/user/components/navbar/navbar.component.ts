import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AdmissionGuard } from '../../guards/admission.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faUser = faCircleUser;
  faRightToBracket = faRightFromBracket
  userDetails!: any;
  constructor(
    private authguard: AdmissionGuard,
    private router: Router,
  ) { }

  isStudentLogin(): boolean {
    const token = localStorage.getItem('userToken');

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


}

