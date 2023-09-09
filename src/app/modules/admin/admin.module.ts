import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { EventsComponent } from './components/events/events.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailComponent } from './components/students/student-details/student-details.component';
import { ClassComponent } from './components/class/class.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdmissionApprovalComponent } from './components/admission/admission-approval/admission-approval.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentComponent } from './components/department/department.component';
import { BatchesComponent } from './components/batches/batches.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { AddFacultyComponent } from './components/faculties/add-faculty/add-faculty.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { AddBatchComponent } from './components/batches/add-batch/add-batch.component';
import { StudentDetailsComponent } from './components/admission/student-details/student-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExportAsModule } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { EditFacultyComponent } from './components/faculties/edit-faculty/edit-faculty.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { EditBatchComponent } from './components/batches/edit-batch/edit-batch.component';
import { PositiveNumberDirective } from 'src/app/common/directives/postive-number.directive';
import { AdmissionChartComponent } from './components/dashboard/admission-chart/admission-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    AdmissionComponent,
    EventsComponent,
    StudentsComponent,
    ClassComponent,
    LoginComponent,
    AdmissionApprovalComponent,
    DepartmentComponent,
    BatchesComponent,
    FacultiesComponent,
    AddFacultyComponent,
    AddDepartmentComponent,
    AddBatchComponent,
    StudentDetailsComponent,
    StudentDetailComponent,
    EditFacultyComponent,
    EditDepartmentComponent,
    EditBatchComponent,
    PositiveNumberDirective,
    AdmissionChartComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    ExportAsModule,
    NgApexchartsModule
  ],
  providers: [DatePipe,CurrencyPipe]
})
export class AdminModule { }
