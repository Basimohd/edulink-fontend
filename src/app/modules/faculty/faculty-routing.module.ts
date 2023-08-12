import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardReverese } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

const routes: Routes = [
    {path:'login',component:LoginComponent, canActivate: [AuthGuardReverese] },
    {path:'register',component:RegisterComponent, canActivate: [AuthGuardReverese] },
    {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard] },
    {path:'attendance',component:AttendanceComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
