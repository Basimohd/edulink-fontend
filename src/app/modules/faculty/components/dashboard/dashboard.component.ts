import { Component, ViewChild } from '@angular/core';
import { AttendanceChartComponent } from './attendance-chart/attendance-chart.component';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { NavigationExtras, Router } from '@angular/router';
import { AssingmentService } from '../../services/assignment.service';
import { facultyService } from '../../services/faculty.service';

interface Day {
  day: number | null;
  currentMonth: boolean;
  isToday: boolean
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(AttendanceChartComponent) childComponent!: AttendanceChartComponent;
  batch!: string;
  departmentName!: string;
  faeye = faEye;
  recentSubmissions!: any;
  allAssignemnt!: any;
  currentMonthName!: string;
  currentYear!: number;
  weeks: Day[][] = [];
  facultyName!: string;
  submissionPerc: number = 0;

  constructor(
    private _assignmentService: AssingmentService,
    private _facultyService: facultyService,
    private _router: Router
  ) { }
  ngAfterViewInit() {
    const batch = this.childComponent.batch;
    this.batch = `${batch.batch.startYear} - ${batch.batch.endYear}`
    this.departmentName = batch.department.departmentName
  }

  ngOnInit() {
    const currentDate = new Date();
    this.currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = currentDate.getFullYear();
    this.generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    this.loadAssignments()
    const facultyId = localStorage.getItem('facultyId')
    this._facultyService.getFacultyData(facultyId).subscribe((res: any) => {
      this.facultyName = res.facultyName
    })
  }


  loadAssignments() {
    const facultyId = localStorage.getItem('facultyId')
    this._assignmentService.fetchAssignments(facultyId).subscribe((assignments: any) => {
      this.allAssignemnt = assignments
      const allSubmissions = assignments.flatMap((assignment: any) =>
        assignment.submissions.map((submission: any) => ({
          title: assignment.title,
          assignmentId: assignment._id,
          ...submission
        }))
      );
      allSubmissions.forEach((submission: any) => {
        submission.lastUpdated = new Date(submission.lastUpdated);
      });
      allSubmissions.sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);
      const totalSubmissions = allSubmissions.length;
      const gradedSubmissions = allSubmissions.filter((submission:any) => submission.isGraded == true);
      console.log(gradedSubmissions);
      
      this.submissionPerc = (gradedSubmissions.length / totalSubmissions) * 100;
      this.recentSubmissions = allSubmissions.slice(0, 7);
    })
  }

  onView(assignmentId: string) {
    const assignment = this.allAssignemnt.filter((assignment: any) => assignment._id === assignmentId);
    const navigationExtras: NavigationExtras = {
      state: assignment[0]
    }
    this._router.navigate(['/faculty/assignment/details'], navigationExtras)
  }


  generateCalendar(year: number, month: number) {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth: Day[] = [];

    // Calculate the starting day of the week (0 for Sunday, 1 for Monday, ...)
    const startingDay = (firstDay.getDay() + 7) % 7;

    // Add empty days for the days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      daysInMonth.push({ day: null, currentMonth: false, isToday: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString(); // Check if the current date is today
      daysInMonth.push({ day: i, currentMonth: isCurrentMonth, isToday: isToday });
    }

    this.weeks = this.chunkArray(daysInMonth, 7);
  }

  chunkArray(array: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

}
