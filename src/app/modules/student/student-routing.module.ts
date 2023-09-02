import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPortalComponent } from './components/layouts/student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeesComponent } from './components/fees/fees.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AuthGuard } from '../user/guards/auth.guard';
import { AttendaceChartComponent } from './components/attendance/attendace-chart/attendace-chart.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { ChatComponent } from './components/chat/chat.component';
import { StudentGuard } from './guards/student.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: StudentPortalComponent, canActivate: [StudentGuard], children: [
    { path: 'dashboard', component: ProfileComponent, canActivate: [StudentGuard] },
    { path: 'fees', component: FeesComponent, canActivate: [StudentGuard] },
    { path: 'attendance', component: AttendanceComponent, canActivate: [StudentGuard] },
    { path: 'assignment', component: AssignmentComponent, canActivate: [StudentGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [StudentGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [StudentGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
