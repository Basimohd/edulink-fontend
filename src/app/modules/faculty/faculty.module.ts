import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyRoutingModule } from './faculty-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveApplicationsComponent } from './components/attendance/leave-applications/leave-applications.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AddAssignmentComponent } from './components/assignment/add-assignment/add-assignment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssignmentDetailsComponent } from './components/assignment/assignment-details/assignment-details.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChatComponent } from './components/chat/chat.component';
import { ApproveGroupsComponent } from './components/chat/approve-groups/approve-groups.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttendanceChartComponent } from './components/dashboard/attendance-chart/attendance-chart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/students/student-details/student-details.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    AttendanceComponent,
    LeaveApplicationsComponent,
    AssignmentComponent,
    AddAssignmentComponent,
    AssignmentDetailsComponent,
    SetPasswordComponent,
    ChatComponent,
    ApproveGroupsComponent,
    AttendanceChartComponent,
    ProfileComponent,
    StudentsComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
  ]
})
export class FacultyModule { }
