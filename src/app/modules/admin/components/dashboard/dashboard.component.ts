import { Component } from '@angular/core';
import { faChalkboardTeacher, faSchool, faTicket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AdmissionService } from '../../services/admission.service';
import { admissionStatus } from '../admission/admission.enum';
import { FacultyService } from '../../services/faculty.service';
import { DepartmentService } from '../../services/department.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  breadcrumbName: string = 'Dashboard';
  faTicket = faTicket
  faUsers = faUsers
  faChalkboardTeacher = faChalkboardTeacher
  faSchool = faSchool
  admissionEnquiryCount:number = 0
  studentCount:number = 0
  facultyCount:number = 0
  departmentCount:number = 0

  constructor(
    private _admissionService:AdmissionService,
    private _facultyService:FacultyService,
    private _departmentService:DepartmentService
  ){}

  ngOnInit(){
    this._admissionService.fetchAdmissionEnquiries().subscribe((res:any)=>{
      this.admissionEnquiryCount = res.length;
      this.studentCount = res.filter((admission:any)=>admission.admissionStatus === admissionStatus.APPROVED).length;
    })
    this._facultyService.fetchFaculties().subscribe((faculties:any)=>{
      this.facultyCount = faculties.faculties.length;
    })
    this._departmentService.fetchDepartment().subscribe((res:any)=>{
      this.departmentCount = res.departments.length
    })
  }
}
