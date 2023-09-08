import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { studentService } from '../../../services/student.service';
@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent {
  departmentDetails!:any;
  constructor(
    private _departmentService:studentService,
    private route: ActivatedRoute,
    private router:Router
    ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const departmentId = params['id'];
      if(departmentId){
        this._departmentService.fetchDepartment().subscribe((res:any)=>{
          res.departments.forEach((department:any)=>{
            if(department._id == departmentId){
              this.departmentDetails = department
              console.log(department);
              
            }
          })
        })
      }else{
        this.router.navigate(['/department'])
      }
    });
  }
}