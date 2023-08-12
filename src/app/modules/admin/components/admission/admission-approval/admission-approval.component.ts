import { Component, Inject,NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdmissionService } from '../../../services/admission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-admission-approval',
  templateUrl: './admission-approval.component.html',
  styleUrls: ['./admission-approval.component.css']
})
export class AdmissionApprovalComponent {
  
  departments: any[] = [];
  batches: any[] = [];
  

  constructor(
    public dialogRef: MatDialogRef<AdmissionApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _admissionService: AdmissionService,
    private _departmentService: DepartmentService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.fetchBatches(this.data.department._id)
    this.fetchDepartment();
    this.approvalForm.get('department')?.setValue(this.data.department._id)
  }

  approvalForm = this.fb.group({
    department: ['', Validators.required],
    batch: ['', Validators.required],
  })
  fetchDepartment(){
    this._departmentService.fetchDepartment().subscribe((res:any)=>{
      this.departments = res.departments
    })
  }
  fetchBatches(departmentId:string){
    this._admissionService.fetchBatchesByDepartment(departmentId).subscribe((res)=>{
      this.batches = res.batches
    })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  get f() {
    return this.approvalForm.controls;
  }

  departmentChange(e:any){
    this.approvalForm.get('department')?.setValue(e.value);
    this.fetchBatches(e.value);
  }
}
