import { Component } from '@angular/core';
import { studentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments!:any[]

  constructor(
    private _departmentService:studentService,
    private _router:Router
  ){}

  ngOnInit() { 
    this.loadDepartments()
  }

  loadDepartments(){
    this._departmentService.fetchDepartment().subscribe((res:any)=>{
      this.departments = res.departments
    })
  }

  onDepartment(departmentId: string){
    this._router.navigate(['/department/details'], { queryParams: { id: departmentId } });
  }
}
