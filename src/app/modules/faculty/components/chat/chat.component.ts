import { Component } from '@angular/core';
import { groupType } from '../../enums/groupType.enum';
import { messageDetails } from '../../interfaces/messageDetails.interface';
import { senderType } from '../../enums/senderType.enum';

import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '../../services/chat.service';
import { ApproveGroupsComponent } from './approve-groups/approve-groups.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonStatus } from 'src/app/common/enums/leave-status.enum';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  faChevronLeft = faChevronLeft;

  communities: any[] = [];
  groups: any[] = [];
  groupApprovals: any[] = [];

  selectedCommunity !: any;
  messages: any[] = [];
  senderMessages: any[] = [];
  textMessage: string = '';
  groupId: string = ''
  groupType!: groupType | null;
  groupCount: number = 0;
  groupName: string = ''
  readonly studentId: string | null = localStorage.getItem('userId');
  groupedMessages: { date: string, messages: any[] }[] = [];
  lastSenderId: string | null = null;
  lastConsecutiveTimes = 0;
  facultyId = localStorage.getItem('facultyId');

  constructor(
    private _chatService: ChatService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._chatService.getNewMessage().subscribe((res) => {
      this.loadMessages()
    })
    this.laodCommunities();
    this.loadGroups();
  }
  ngAfterViewInit() {
    console.log(this.lastConsecutiveTimes);

  }
  laodCommunities() {
    const facultyId = localStorage.getItem('facultyId');
    this._chatService.getCommunities(facultyId).subscribe((res: any) => {
      this.communities = res;
    })
  }
  loadGroups() {
    this.groups = [];
    this.groupApprovals = [];
    const facultyId = localStorage.getItem('facultyId');
    this._chatService.getGroup(facultyId).subscribe((res: any) => {
      console.log(res);

      res.forEach((group:any)=>{
        
        if(group.isApproved == CommonStatus.Approved){
          this.groups.push(group)
        }else{
          this.groupApprovals.push(group)
        }
      })
    })
  }
  onCommunity(communityId: string) {
    this.textMessage = ''
    this.communities.forEach((community:any) => {
      if (community._id == communityId) {
        this.groupId = communityId
        this.groupType = groupType.COMMUNITY
        this.messages = community.messages;
        this.groupName = community.departmentId.departmentName
        this.groupCount = community.groups.length
      }
    })
    this.loadMessages()
  }
  onBack(){
    this.groupId = ''
    this.groupType = null;
    this.messages = []
    this.groupName = ''
    this.groupCount = 0
  }
  onGroup(groupId: string){
      this.textMessage = ''
      const group = this.groups.find((group) => group._id === groupId);
      if (group) {
        if (group.isApproved) {
          this.groupId = groupId;
          this.groupType = groupType.GROUP;
          this.messages = group.messages;
          this.groupName = group.groupName;
          this.groupCount = group.facultyParticipants.length + group.studentParticipants.length;
        } else {
          this._snackBar.open("Group is Not Approved Yet!!", 'Close', {
            duration: 700,
          });
        }
      }
      this.loadMessages()
  }
  onSend() {
    if (this.textMessage) {
      const studentId = localStorage.getItem('facultyId')
      const messageDetails: messageDetails = {
        groupType: this.groupType,
        content: this.textMessage,
        groupId: this.groupId,
        senderId: studentId,
        senderType: senderType.FACULTY
      }
      this._chatService.sendMessage(messageDetails)
      this.loadMessages()
    }
    this.textMessage = ''
  }

  loadMessages() {
    this._chatService.loadMessages(this.groupId, this.groupType).subscribe((res: any) => {
      this.groupedMessages = []
      res.forEach((message: any) => {
        if (message.senderId === this.lastSenderId) {
          this.lastConsecutiveTimes++;
        } else {
          this.lastSenderId = message.senderId;
          this.lastConsecutiveTimes = 1;
        }
        const formattedDate = this.formatDate(message.timestamp);
        const groupIndex = this.groupedMessages.findIndex(group => group.date === formattedDate);

        if (groupIndex === -1) {
          this.groupedMessages.push({ date: formattedDate, messages: [message] });
        } else {
          this.groupedMessages[groupIndex].messages.push(message);
        }
      });
    })
  }

  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
      return 'Today';
    } else if (date >= yesterday) {
      return 'Yesterday';
    } else {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  }



  onApprovals() {
    this.loadGroups()
    console.log(this.groupApprovals);
    
    const dialogRef = this.dialog.open(ApproveGroupsComponent, {
      data: {groupApprovals:this.groupApprovals},
      height: ''
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
