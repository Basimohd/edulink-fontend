import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { groupType } from '../../enums/groupType.enum';
import { messageDetails } from '../../interfaces/messageDetails.interface';
import { senderType } from '../../enums/senderType.enum';
import { AddGroupComponent } from './add-group/add-group.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonStatus } from 'src/app/common/enums/leave-status.enum';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  faChevronLeft = faChevronLeft;

  community!: any;
  groups: any[] = [];
  selectedCommunity !: any;
  messages: any[] = [];
  senderMessages: any[] = [];
  textMessage: string = '';
  groupId: string = ''
  groupName: string = ''
  groupCount: number = 0;
  groupType!: groupType | null;
  readonly studentId: string | null = localStorage.getItem('userId');
  groupedMessages: { date: string, messages: any[] }[] = [];
  lastSenderId: string | null = null;
  lastConsecutiveTimes = 0;


  constructor(
    private _chatService: ChatService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._chatService.getNewMessage().subscribe((res) => {
      this.loadMessages()
    })
    this.laodCommunities()
    this.loadGroups()
  }
  ngAfterViewInit() {
    console.log(this.lastConsecutiveTimes);

  }
  laodCommunities() {
    const studentId = localStorage.getItem('userId');
    this._chatService.getCommunities(studentId).subscribe((res: any) => {
      this.community = res;
    })
  }
  loadGroups() {
    const studentId = localStorage.getItem('userId');
    this._chatService.getGroup(studentId).subscribe((res: any) => {
      this.groups = res;
    })
  }
  onCommunity(communityId: string) {
    this.textMessage = ''
      if (this.community._id == communityId) {
        this.groupId = communityId
        this.groupType = groupType.COMMUNITY
        this.messages = this.community.messages;
        this.groupName = this.community.departmentId.departmentName
        this.groupCount = this.community.groups.length
      }
    this.loadMessages()
  }
  onGroup(groupId: string){
    this.textMessage = ''
    this.groups.forEach((group) => {
      if (group._id == groupId) {
        if(group.isApproved == CommonStatus.Approved){
        this.groupId = groupId
        this.groupType = groupType.GROUP
        this.messages = group.messages;
        this.groupName = group.groupName
        this.groupCount = group.facultyParticipants.length + group.studentParticipants.length
        }else{
          this._snackBar.open("Group is Not Approved Yet!!", 'Close', {
            duration: 700,
          });
        }
      }
      
    })
    this.loadMessages();
  }
  onBack(){
    this.groupId = ''
    this.groupType = null;
    this.messages = []
    this.groupName = ''
    this.groupCount = 0
  }
  onSend() {
    const studentId = localStorage.getItem('userId')
    if (this.textMessage) {
      const messageDetails: messageDetails = {
        groupType: this.groupType,
        content: this.textMessage,
        groupId: this.groupId,
        senderId: studentId,
        senderType: senderType.STUDENT
      }
      this._chatService.sendMessage(messageDetails)
      this.loadMessages()
    }
    this.textMessage = ''

  }

  loadMessages() {
    this._chatService.loadMessages(this.groupId, this.groupType).subscribe((res: any) => {
      this.groupedMessages = []
      console.log(res);
      
      res.forEach((message: any) => {

        const formattedDate = this.formatDate(message.timestamp);
        const groupIndex = this.groupedMessages.findIndex(group => group.date === formattedDate);

        if (groupIndex === -1) {
          this.groupedMessages.push({ date: formattedDate, messages: [message] });
        } else {
          this.groupedMessages[groupIndex].messages.push(message);
        }
      });
      console.log(this.groupedMessages);

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



  onAddGroup() {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      data: {communityId:this.community._id},
      height: ''
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadGroups()
    })
  }
}
