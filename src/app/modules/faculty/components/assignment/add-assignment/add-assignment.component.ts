import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AssingmentService } from '../../../services/assignment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  departmentData!:any;

  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AddAssignmentComponent>,
    private _assingmentService : AssingmentService
  ){}

  ngOnInit(){
    let facultyId = localStorage.getItem('facultyId');
    this._assingmentService.fetchDepartmentByFaculty(facultyId).subscribe((res)=>{
      if(res){
        this.departmentData = res
      }
    })
  }

  assignmentForm = this.fb.group({
    department:['',Validators.required],
    title:['',Validators.required],
    description:['',Validators.required],
    dueDate:['',Validators.required],
  })

  onSubmit(){
    if(this.assignmentForm.valid){
      const facultyId = localStorage.getItem('facultyId')
      this._assingmentService.addAssignment(this.assignmentForm.value,facultyId).subscribe((res)=>{
        if(res){
          this.dialogRef.close()
        }
        
      })
    }
  }

  getControl(name: any): AbstractControl | null {
    return this.assignmentForm.get(name);
  }
}
