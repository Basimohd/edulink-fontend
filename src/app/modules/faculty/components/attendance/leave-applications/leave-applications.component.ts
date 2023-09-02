import { Component, Inject } from '@angular/core';
import { studentService } from '../../../services/student.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonStatus } from 'src/app/common/enums/leave-status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-applications',
  templateUrl: './leave-applications.component.html',
  styleUrls: ['./leave-applications.component.css']
})
export class LeaveApplicationsComponent {
  leaveApplications!:any;
  CommonStatus = CommonStatus
  constructor(
    private _studentService: studentService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  ngOnInit(){
    this.leaveApplications = this.data.studentDetails.leaveApplications
  }
  onStatusChange(status : CommonStatus,leaveId:string){
    let updateData ={
      status:status,
      studentId:this.data.studentDetails._id,
      leaveId:leaveId
    }
    let textStatus = ''
    let statusText = 'Reject'
    if(status == CommonStatus.Approved ){
      textStatus = ' It will Automatically Mark as Absent'
      statusText = 'Approve'
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this! ${textStatus}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${statusText} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        this._studentService.updateLeaveStatus(updateData).subscribe((res:any)=>{
          if(res){
            this.leaveApplications.forEach((leave:any)=>{
              if(leave._id == leaveId){
                leave.status = status
              }
            })

          }
        })
      }
    })
  }

}
