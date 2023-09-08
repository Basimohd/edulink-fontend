import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { admissionService } from '../../services/admission.service';

import { GlobalConstants } from 'src/app/common/global-constants';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/modules/admin/services/department.service';
import { studentService } from '../../services/student.service';
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent {

  constructor(
    private fb: FormBuilder,
    private departmentService: studentService,
  ) { }
  
  departments:any[] = []
  submitted: boolean = false;
  formError: boolean = false;
  grades: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  file!: File;

  ngOnInit(){
    this.departmentService.fetchDepartment().subscribe((res:any)=>{
      this.departments = res.departments
    })
  }
  
  admissionForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    studentEmail: ['', [Validators.required, Validators.email]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    studentPhone: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
    address: ['', [Validators.required]],
    department: ['', [Validators.required]],
    quota: ['', [Validators.required]],
    admissionType: ['', [Validators.required]],
    guardianName: ['', [Validators.required]],
    relation: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    guardianPhone: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
    previousInstitute: ['', [Validators.required]],
    courseStudied: ['', [Validators.required]],
    passingYear: ['', [Validators.required]],
  });

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  get f() {
    return this.admissionForm.controls;
  }

  onSubmit() {
    console.log("clicked")
    
  }
}
