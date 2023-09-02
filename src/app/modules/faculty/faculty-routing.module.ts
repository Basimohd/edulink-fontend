import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardReverese } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AssignmentDetailsComponent } from './components/assignment/assignment-details/assignment-details.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
    {path:'login',component:LoginComponent, canActivate: [AuthGuardReverese] },
    {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard] },
    {path:'attendance',component:AttendanceComponent, canActivate: [AuthGuard] },
    {path:'assignment',component:AssignmentComponent, canActivate: [AuthGuard] },
    {path:'chat',component:ChatComponent, canActivate: [AuthGuard] },
    {path:'profile',component:ProfileComponent, canActivate: [AuthGuard] },
    {path:'students',component:StudentsComponent, canActivate: [AuthGuard] },
    {path:'set-password/:token',component:SetPasswordComponent },
    {path:'assignment/details',component:AssignmentDetailsComponent,canActivate:[AuthGuard]},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
