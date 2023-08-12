import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyRoutingModule } from './faculty-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveApplicationsComponent } from './components/attendance/leave-applications/leave-applications.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    AttendanceComponent,
    LeaveApplicationsComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class FacultyModule { }
