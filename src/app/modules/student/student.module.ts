import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeesComponent } from './components/fees/fees.component';
import { FeeInvoiceComponent } from './components/fees/fee-invoice/fee-invoice.component';
import { FeePaymentComponent } from './components/fees/fee-payment/fee-payment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SumPipe } from 'src/app/common/pipes/sum.pipe';
import { AttendaceChartComponent } from './components/attendance/attendace-chart/attendace-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StudentPortalComponent } from './components/layouts/student.component';
import { PortalNavbarComponent } from './components/layouts/portal-navbar/portal-navbar.component';
import { PortalSidebarComponent } from './components/layouts/portal-sidebar/portal-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { LeaveApplicationComponent } from './components/attendance/leave-application/leave-application.component';
import { LeaveApplicationsComponent } from './components/attendance/leave-applications/leave-applications.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FeesComponent,
    FeeInvoiceComponent,
    FeePaymentComponent,
    SumPipe,
    AttendanceComponent,
    AttendaceChartComponent,
    StudentPortalComponent,
    PortalNavbarComponent,
    PortalSidebarComponent,
    LeaveApplicationComponent,
    LeaveApplicationsComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgApexchartsModule,
    MatIconModule,
    FullCalendarModule,
  ]
})
export class StudentModule { }
