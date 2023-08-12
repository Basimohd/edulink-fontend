import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPortalComponent } from './components/layouts/student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeesComponent } from './components/fees/fees.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AuthGuard } from '../user/guards/auth.guard';
import { AttendaceChartComponent } from './components/attendance/attendace-chart/attendace-chart.component';

const routes: Routes = [
  { path: '', component: StudentPortalComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'fees', component: FeesComponent },
    { path: 'attendance', component: AttendanceComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
