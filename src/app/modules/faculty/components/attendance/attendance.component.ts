import { Component, ViewChild } from '@angular/core';
import { studentService } from '../../services/student.service';
import { attendanceStatus } from 'src/app/common/enums/attendance-status.enum';
import { attendanceService } from '../../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent {
  attendanceStatuses = [
    { value: attendanceStatus.Present, label: 'Present', borderColor: '#34D399', backgroundColor: '#10B981' },
    { value: attendanceStatus.HalfDay, label: 'Half Day', borderColor: '#F59E0B', backgroundColor: '#FCD34D' },
    { value: attendanceStatus.Absent, label: 'Absent', borderColor: '#EF4444', backgroundColor: '#F87171' }
  ];
  NoStudent!:boolean;
  NoBatch!:boolean;
  students!: MatTableDataSource<any>;
  displayedColumns: string[] = ['number', 'name', 'status', 'action'];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  faeye = faEye;
  batch!:any;
  selectedDate: Date = new Date();
  todaysDate!:string
  
  
  constructor(
    private _studentService: studentService,
    private _attendanceService: attendanceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    const today = new Date();
    this.todaysDate = this.formatDate(today);
    this.loadStudent()
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadStudent(){
    let facultyId = localStorage.getItem('facultyId')
    this._studentService.fetchStudentsByDepartment(facultyId).subscribe((res)=>{
      if(res){
        let students = res.students
        this.batch = res.batch
        students.forEach((student:any)=>{
          const attendanceRecord = student.attendance;
          console.log(attendanceRecord);
          attendanceRecord.forEach((attendance:any)=>{
            let date = new Date(attendance.date).setUTCHours(0, 0, 0, 0);
            if(this.selectedDate.setUTCHours(0,0,0,0)==date){
              student.attendance = attendance
            }
          })
        })
      this.students = new MatTableDataSource<any>(students);
      this.students.paginator = this.paginatior;
      
      }
    },(err)=>{
      console.log(err)
    })
  }
  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = new Date(inputElement.value);
    this.loadStudent()
  }

  onAttendanceChange(student: any): void {
    const payload = {
      studentId:student._id,
      studentAtendance:student.attendance.status,
      selectedDate:this.selectedDate.toISOString()
    }
    console.log(payload)
    this._attendanceService.updateAttendance(payload).subscribe((res)=>{
      if(res){
        this._snackBar.open("Attendance Changed!", 'Close', {
          duration: 2000,
        });
      }
    })
  }
  onClick(student:any){
    const dialogRef = this.dialog.open(LeaveApplicationsComponent, {
      data: {studentDetails:student},
      height:'460px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Registered")
    })
  }
}
