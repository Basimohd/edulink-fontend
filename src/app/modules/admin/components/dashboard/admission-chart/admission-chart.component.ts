
import { Component, ElementRef, ViewChild,Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexStroke,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexLegend,
  ApexXAxis,
  ApexGrid,
  ApexYAxis,
  ApexResponsive
} from "ng-apexcharts";
import { AdmissionService } from "../../../services/admission.service";

export type ChartOptions = {
  series: any;
  chart: any;
  labels: string[];
  plotOptions: any;
  stroke: any;
  colors:any;
  dataLabels:any;
  legend:any;
  xaxis:any;
  grid:any;
  yaxis:any;
  responsive:any;
};

interface ProcessedData {
  name: string;
  data: number[];
}
@Component({
  selector: 'app-admission-chart',
  templateUrl: './admission-chart.component.html',
  styleUrls: ['./admission-chart.component.css']
})
export class AdmissionChartComponent {

    @ViewChild("chart") chart!: ChartComponent;
    @Output() dataEvent = new EventEmitter<any>();
  
    attendancePerc!:number;
    startYear!:any
    endYear!:any
    public chartOptions!: Partial<ChartOptions>;
    
    constructor(
      private _studentService:AdmissionService
    ) {
  
    }
  
    ngOnInit(){
      this.loadAttendance()
      
    }
    loadAttendance() {
      let userId = localStorage.getItem('userId');
      this._studentService.fetchAdmissionEnquiries().subscribe((res:any) => {
      const proccessedData = this.processAdmissions(res)
      this.chartOptions = {
        colors: ["#4ade80", "#f43f5e", "#f0ad4e"],
        series: proccessedData,
        chart: {
          height: 270,
          type: "bar",
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            barHeight: "90%",
            columnWidth: "35%",
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          labels: {
            hideOverlappingLabels: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        yaxis: {
          show: false,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
       
      };
      });
      
    }
    
  
    processAdmissions(admissions: any): ProcessedData[] {
      const processedDataMap: Map<string, Map<number, number[]>> = new Map();
    
      admissions.forEach((admission:any) => {
        const admissionDate = new Date(admission.admissionDate);
        const admissionStatus = admission.admissionStatus;
        const month = admissionDate.getUTCMonth();
    
        if (!processedDataMap.has(admissionStatus)) {
          processedDataMap.set(admissionStatus, new Map());
        }
    
        if (!processedDataMap.get(admissionStatus)!.has(month)) {
          processedDataMap.get(admissionStatus)!.set(month, []);
        }
    
        processedDataMap.get(admissionStatus)!.get(month)!.push(1);
      });
    
      const processedData: ProcessedData[] = [];
    
      processedDataMap.forEach((monthMap, status) => {
        const data: number[] = [];
    
        for (let month = 0; month < 12; month++) {
          const countArray = monthMap.get(month) || [];
          data.push(countArray.length);
        }
    
        processedData.push({ name: status, data });
      });
      
      return processedData;
    }
  }