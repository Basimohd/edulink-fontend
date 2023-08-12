import { Component, ElementRef, ViewChild,Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import { studentService } from "../../../service/student.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-attendance-chart',
  templateUrl: './attendace-chart.component.html',
  styleUrls: ['./attendace-chart.component.css']
})
export class AttendaceChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  @Output() dataEvent = new EventEmitter<any>();

  attendancePerc!:number;
  startYear!:any
  endYear!:any
  public chartOptions!: Partial<ChartOptions>;
  
  constructor(
    private _studentService:studentService
  ) {

  }

  ngOnInit(){
    this.loadAttendance()
    this.dataEvent.emit({startYear:this.startYear,endYear:this.endYear});
  }
  loadAttendance(){
    let userId = localStorage.getItem('userId');
    this._studentService.getUserDetails(userId).subscribe((res:any)=>{
       this.attendancePerc = this.calculateAcademicYearPresentPercentage(res.attendance);
       this.chartOptions = {
        series: [this.attendancePerc],
        chart: {
          height: 240,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: true,
                color: "#000",
                offsetY: 10,
                fontSize: "29px",
                fontWeight: 600,
              },
            },
          },
        },
        stroke: {
          lineCap: "round",
        },
      };
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
}
