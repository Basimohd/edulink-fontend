import { Component } from '@angular/core';
import { studentService } from '../../../service/student.service';
import Swal from 'sweetalert2';
import { leaveApplicationStatus } from 'src/app/common/enums/leave-status.enum';

@Component({
  selector: 'app-leave-applications',
  templateUrl: './leave-applications.component.html',
  styleUrls: ['./leave-applications.component.css']
})
export class LeaveApplicationsComponent {
  leaveApplications!:any;
  leaveApplicationStatus = leaveApplicationStatus

  constructor(
    private _studentService: studentService
  ){}
  ngOnInit(){
    this.loadLeaveApplication()
  }
  loadLeaveApplication(){
    let userId = localStorage.getItem('userId');
    this._studentService.getUserDetails(userId).subscribe((res:any)=>{
        this.leaveApplications = res.leaveApplications
        console.log(this.leaveApplications)
    })
  }

  onDelete(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._studentService.deleteLeave(id).subscribe((res:any)=>{
          this.loadLeaveApplication()
        })
      }
    })
  }
}
