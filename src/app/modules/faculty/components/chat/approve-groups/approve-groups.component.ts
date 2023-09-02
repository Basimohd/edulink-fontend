import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonStatus } from 'src/app/common/enums/leave-status.enum';
import Swal from 'sweetalert2';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-approve-groups',
  templateUrl: './approve-groups.component.html',
  styleUrls: ['./approve-groups.component.css']
})
export class ApproveGroupsComponent {
  groupsToBeApproved:any[] = []
  CommonStatus = CommonStatus


  constructor(
    public dialogRef: MatDialogRef<ApproveGroupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _chatService:ChatService
  ) { }

  ngOnInit(){
    this.groupsToBeApproved = this.data.groupApprovals
  }

  onStatusChange(status : CommonStatus,groupId:string){
    let updateData ={
      status:status,
      groupId:groupId
    }
    let textStatus = ''
    let statusText = 'Reject'
    if(status == CommonStatus.Approved ){
      statusText = 'Approve'
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${statusText} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        this._chatService.updateGroupStatus(updateData).subscribe((res:any)=>{
          if(res){
            this.groupsToBeApproved.forEach((group:any)=>{
              if(group._id == groupId){
                group.isApproved = status
              }
            })

          }
        })
      }
    })
  }

}
