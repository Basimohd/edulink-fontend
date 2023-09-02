import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  
} from "ng-apexcharts";
import { studentService } from '../../../services/student.service';
import { attendanceStatus } from 'src/app/common/enums/attendance-status.enum';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend:any;
  dataLabels:any;
  colors:any;
};


@Component({
  selector: 'app-attendance-chart',
  templateUrl: './attendance-chart.component.html',
  styleUrls: ['./attendance-chart.component.css']
})
export class AttendanceChartComponent {
  @Output() dataEvent = new EventEmitter<any>();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  batch!:any;
  todaysDate: Date = new Date();
  presentCount:number = 0;
  absentCount:number = 0;
  halfDayCount:number = 0;
  notMarkedCount:number = 0;

  constructor(
    private _studentService: studentService,
  ){}

  ngOnInit(){
    this.loadStudent()
    this.dataEvent.emit({department:this.batch.department.departmentName,batch:`${this.batch.batch.startYear} - ${this.batch.batch.endYear}`});

  }
  loadStudent(){
    let facultyId = localStorage.getItem('facultyId')
    this._studentService.fetchStudentsByDepartment(facultyId).subscribe((res)=>{
      if(res){
        let students = res.students
        this.batch = res.batch
        students.forEach((student:any)=>{
          const attendanceRecord = student.attendance;
          attendanceRecord.forEach((attendance:any)=>{
            let date = new Date(attendance.date).setUTCHours(0, 0, 0, 0);
            if(this.todaysDate.setUTCHours(0,0,0,0)==date){
              student.attendance = attendance
            }
          })
          switch (student.attendance.status) {
            case attendanceStatus.Present:
              this.presentCount++;
              break;
            case attendanceStatus.Absent:
              this.absentCount++;
              break;
            case attendanceStatus.HalfDay:
              this.halfDayCount++;
              break;
            default:
              this.notMarkedCount++;
              break;
          }          
        })  
        console.log(this.batch);
        
        this.chartOptions = {
          colors: ["#4ade80", "#f43f5e", "#f0ad4e",'#D3D3D3'],
      
            series: [this.presentCount, this.absentCount, this.halfDayCount,this.halfDayCount],
            chart: {
              type: "donut"
            },
            labels: ["Present", "Absent", "Half Day","Not Marked"],
            legend: { show: false },
            dataLabels: { enabled: false },
            
        }

      }
    },(err)=>{
      console.log(err)
    })
  }




}
