import { Component } from '@angular/core';
import { studentService } from '../../../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-sidebar',
  templateUrl: './portal-sidebar.component.html',
  styleUrls: ['./portal-sidebar.component.css']
})
export class PortalSidebarComponent {
  studentData!: any;
  showDropdown: boolean = false

  constructor(
    private _studentService: studentService,
    private _router: Router,
  ) { }

  ngOnInit() {
    const studentId = localStorage.getItem('userId')
    this._studentService.getUserDetails(studentId).subscribe((res) => {
      this.studentData = res
    })
  }
  onProfile() {
    this.showDropdown = !this.showDropdown
  }

  onLogout() {
    localStorage.removeItem(`userToken`);
    localStorage.removeItem(`userId`);
    this._router.navigate(['login']);
  }
}
