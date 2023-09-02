import { Component, ViewChild } from '@angular/core';
import { studentService } from '../../services/student.service';
import { attendanceStatus } from 'src/app/common/enums/attendance-status.enum';
import { attendanceService } from '../../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { StudentDetailsComponent } from './student-details/student-details.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  NoStudent!:boolean;
  NoBatch!:boolean;
  students!: MatTableDataSource<any>;
  displayedColumns: string[] = ['number', 'name', 'attendancePerc', 'action'];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  faeye = faEye;
  batch!:any;
  startYear!:any
  endYear!:any
  
  
  constructor(
    private _studentService: studentService,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.loadStudent()
  }

  loadStudent(){
    let facultyId = localStorage.getItem('facultyId')
    this._studentService.fetchStudentsByDepartment(facultyId).subscribe((res)=>{
      if(res){
        let students = res.students
        this.batch = res.batch
        students.forEach((student:any)=>{
          const attendanceRecord = student.attendance;
          student.attendancePerc = Number(this.calculateAcademicYearPresentPercentage(attendanceRecord).toFixed(0))

          
        })
      this.students = new MatTableDataSource<any>(students);
      this.students.paginator = this.paginatior;
      
      }
    },(err)=>{
      console.log(err)
    })
  }
  calculateAcademicYearPresentPercentage(
    attendance: any
  ): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based index
    
    // Determine the start and end months of the academic year (April to March)
    const academicYearStartMonth = 3; // April (0-based index)
    const academicYearEndMonth = 2; // March (0-based index)
  
    this.startYear = currentMonth >= academicYearStartMonth ? currentYear : currentYear - 1;
     this.endYear = this.startYear + 1;
  
    // Filter attendance records within the academic year
    const academicYearAttendance = attendance.filter((record:any) => {
      const recordDate = new Date(record.date);
      const recordYear = recordDate.getFullYear();
      const recordMonth = recordDate.getMonth(); // 0-based index
  
      return (
        (recordYear === this.startYear && recordMonth >= academicYearStartMonth) ||
        (recordYear === this.endYear && recordMonth <= academicYearEndMonth)
      );
    });
  
    // Count the number of days present
    const daysPresent = academicYearAttendance.filter(
      (record:any) => record.status === "present" || record.status === "halfday"
    ).length;
  
    // Calculate the percentage of days present
    const totalDays = academicYearAttendance.length;
    const presentPercentage = (daysPresent / totalDays) * 100;
  
    return presentPercentage;
  }

  onClick(student:any){
    console.log(student);
    
    const dialogRef = this.dialog.open(StudentDetailsComponent, {
      data: {studentDetails:student.admssionDetails},
      width: '720px',
      maxHeight: '570px',
      panelClass: "custom",
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Registered")
    })
  }
  
}
