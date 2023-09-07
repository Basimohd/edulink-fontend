import { Component } from '@angular/core';
import { studentService } from '../../services/student.service';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments!:any[]

  constructor(
    private _departmentService:studentService
  ){}

  ngOnInit() { 
    this.loadDepartments()
  }

  loadDepartments(){
    this._departmentService.fetchDepartment().subscribe((res:any)=>{
      console.log(res);
      
      this.departments = res.departments
    })
  }
}
