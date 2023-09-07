import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { AdmissionGuard } from './guards/admission.guard';
import { AuthGuardReverese } from './guards/auth-reverse.guard';
import { AdmissionStatusComponent } from './components/admission-status/admission-status.component';
import { AuthGuard } from './guards/auth.guard';
import { ApplicantInfoComponent } from './components/admission/applicant-info/applicant-info.component';
import { CourseDetailsComponent } from './components/admission/course-details/course-details.component';
import { GuardianDetailsComponent } from './components/admission/guardian-details/guardian-details.component';
import { PreviousEducationComponent } from './components/admission/previous-education/previous-education.component';
import { ConfirmationComponent } from './components/admission/confirmation/confirmation.component';
import { StepValidityGuard } from './guards/admission-form.guard';
import { DepartmentsComponent } from './components/departments/departments.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'department', component: DepartmentsComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardReverese] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardReverese] },
  { path: 'admission', component: AdmissionComponent, canActivate: [AdmissionGuard] ,children:[
    { path: '', redirectTo: 'applicant-info', pathMatch: 'full' },
    {path:'applicant-info', component:ApplicantInfoComponent ,},
    {path:'course-details', component:CourseDetailsComponent,canActivate: [StepValidityGuard],},
    {path:'guardian-details', component:GuardianDetailsComponent,canActivate: [StepValidityGuard]},
    {path:'previous-education', component:PreviousEducationComponent,canActivate: [StepValidityGuard]},
    {path:'confirmation', component:ConfirmationComponent,canActivate: [StepValidityGuard]}]},
  { path: 'admission-status', component: AdmissionStatusComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
