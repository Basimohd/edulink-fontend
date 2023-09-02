import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AssignmentComponent } from './components/assignment/assignment.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssignmentDetailComponent } from './components/assignment/assignment-detail/assignment-detail.component';
import { FilePondModule, registerPlugin } from "ngx-filepond";
import * as FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import * as FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { ChatComponent } from './components/chat/chat.component';
import { AddGroupComponent } from './components/chat/add-group/add-group.component';
import { ProfileComponent } from './components/profile/profile.component';

registerPlugin(FilePondPluginFileValidateSize,FilePondPluginFileValidateType);

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
    AssignmentComponent,
    AssignmentDetailComponent,
    FileUploadComponent,
    ChatComponent,
    AddGroupComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgApexchartsModule,
    MatIconModule,
    FullCalendarModule,
    FontAwesomeModule,
    FilePondModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
  ]
})
export class StudentModule { }
