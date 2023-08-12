import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';

import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { OtpModalComponent } from './components/otp-modal/otp-modal.component';
import { NgOtpInputModule } from 'ng-otp-input';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './components/login/login.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdmissionStatusComponent } from './components/admission-status/admission-status.component';
import { StudentPortalComponent } from '../student/components/layouts/student.component';
import { PortalNavbarComponent } from '../student/components/layouts/portal-navbar/portal-navbar.component';
import { PortalSidebarComponent } from '../student/components/layouts/portal-sidebar/portal-sidebar.component';
import { ApplicantInfoComponent } from './components/admission/applicant-info/applicant-info.component';
import { CourseDetailsComponent } from './components/admission/course-details/course-details.component';
import { GuardianDetailsComponent } from './components/admission/guardian-details/guardian-details.component';
import { PreviousEducationComponent } from './components/admission/previous-education/previous-education.component';
import { SidebarComponent } from './components/admission/sidebar/sidebar.component';
import { CardComponent } from './components/admission/card/card.component';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './components/admission/store/form.reducer';
import { ConfirmationComponent } from './components/admission/confirmation/confirmation.component';
import { FileDragNDropDirective } from 'src/app/common/directives/filedrag.directive';
import { FileUploadValidatorDirective } from 'src/app/common/directives/file-filter.directive';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    AdmissionComponent,
    RegisterComponent,
    OtpModalComponent,
    LoginComponent,
    AdmissionStatusComponent,
    ApplicantInfoComponent,
    CourseDetailsComponent,
    GuardianDetailsComponent,
    PreviousEducationComponent,
    SidebarComponent,
    CardComponent,
    ConfirmationComponent,
    FileDragNDropDirective,
    FileUploadValidatorDirective,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    NgOtpInputModule,
    ButtonModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('form',formReducer),
  ]
})
export class UserModule { }
