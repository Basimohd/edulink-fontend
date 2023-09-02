import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { LoginComponent } from './components/login/login.component';
import { ClassComponent } from './components/class/class.component';
import { AuthGuard } from './guards/auth.guard';
import { DepartmentComponent } from './components/department/department.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { BatchesComponent } from './components/batches/batches.component';
import { AuthReverseGuard } from './guards/auth-reverse.guard';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {path:'login',component:LoginComponent,canActivate:[AuthReverseGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'admissions',component:AdmissionComponent,canActivate:[AuthGuard]},
  {path:'classes',component:ClassComponent,canActivate:[AuthGuard]},
  {path:'department',component:DepartmentComponent,canActivate:[AuthGuard]},
  {path:'batches',component:BatchesComponent,canActivate:[AuthGuard]},
  {path:'faculties',component:FacultiesComponent,canActivate:[AuthGuard]},
  {path:'students',component:StudentsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
