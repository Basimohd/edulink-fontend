import { Component } from '@angular/core';
import { studentService } from '../../service/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  studentData!: any;

  constructor(
    private _studentService: studentService,
  ) { }

  ngOnInit() {
    const studentId = localStorage.getItem('userId')
    this._studentService.getUserDetails(studentId).subscribe((res) => {
      this.studentData = res
    })
  }
}
