import { Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { studentService } from 'src/app/modules/user/services/student.service';
import { AttendaceChartComponent } from './attendace-chart/attendace-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  events!:any[]
  @ViewChild(AttendaceChartComponent) childComponent!: AttendaceChartComponent;
  receivedData!:any;
  startYear!:any;
  endYear!:any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events:[],
    fixedWeekCount: false
  };
  
  constructor(
    private _studentService:studentService,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.startYear = this.childComponent.startYear
    this.endYear = this.childComponent.endYear
  }

  ngOnInit(){
    this.loadAttendance()
  }
  loadAttendance(){
    let userId = localStorage.getItem('userId');
    this._studentService.getUserDetails(userId).subscribe((res:any)=>{
      this.calendarOptions.events = res.attendance.map(this.convertToEvent);

    })
  }

  convertToEvent(record: any) {
    let color: string;
    let eventTextColor: string;
    console.log(record.status);
    
    switch (record.status) {
      case "present":
        color = "#198754";
        break;
      case "halfday":
        color = "#FFA500"; 
        break;
      case "absent":
        color = "#FF0000";
        break;
      default:
        color = "gray";
        break;
    }
  
    return {
      date: record.date.substring(0, 10), 
      display: "background",
      color,
    };
  }

  onApply(){
    const dialogRef = this.dialog.open(LeaveApplicationComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Registered")
    })
  }
  onManage(){
    const dialogRef = this.dialog.open(LeaveApplicationsComponent, {
      data: {},
      height:'459px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Registered")
    })
  }
  }

