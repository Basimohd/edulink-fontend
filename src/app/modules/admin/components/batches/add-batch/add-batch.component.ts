import { Component,Inject } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { department } from '../../../interfaces/department.interface';
import { BatchService } from '../../../services/batches.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent {
  departments!: department[];
  batchForm!:FormGroup
  ProfessorData !:any[] | undefined
  batches: any[] = [];

  constructor(
    private _departmentService: DepartmentService,
    private _batchService: BatchService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.batchForm = this._fb.group({
      department: ['', [Validators.required]],
      batch: null,
      tutor: ['', [Validators.required]],
      maxSeats: ['', [Validators.required]],
    })
    this._departmentService.fetchDepartment().subscribe((res: any) => {
      this.departments = res.departments
    })
    
  }


  onDepartmentChange(departmentId: any) {
    const selectedDepartment = this.departments.find((dep) => dep._id === departmentId.value);
    this.ProfessorData = selectedDepartment?.professors;
    const currentYear = new Date().getFullYear();
    const duration = selectedDepartment?.duration || 0;
    for (let i = 0; i <= 10; i++) {
      const startYear = currentYear + i;
      const endYear = startYear + duration;
      this.batches.push({ startYear, endYear });
    }
    return this.batches;
  }

  onBatchSelected(selectedBatch: any) {
    const batchObject = selectedBatch
    console.log(batchObject)
    this.batchForm.get('batch')?.setValue(batchObject);
  }

  onSubmit(){
    if(this.batchForm.valid){
      console.log(this.batchForm.value);
      this._batchService.createBatch(this.batchForm.value).subscribe((res)=>{
        if(res){
          this.dialogRef.close()
        }
      })
    }
  }

}
