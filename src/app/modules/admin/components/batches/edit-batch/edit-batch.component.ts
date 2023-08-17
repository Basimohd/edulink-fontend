import { Component,Inject } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { department } from '../../../interfaces/department.interface';
import { BatchService } from '../../../services/batches.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.css']
})
export class EditBatchComponent {
  departments!: department[];
  batchForm!:FormGroup
  ProfessorData !:any[] | undefined
  batches: any[] = [];
  submitted:boolean = false


  constructor(
    private _departmentService: DepartmentService,
    private _batchService: BatchService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    
    this.batchForm = this._fb.group({
      department: ['', [Validators.required]],
      batch: null,
      tutor: ['', [Validators.required]],
      maxSeats: ['', [Validators.required]],
    })
    this.fetchDepatment()
    

  }

  fetchDepatment(){
    this._departmentService.fetchDepartment().subscribe((res: any) => {
      this.departments = res.departments
      this.onDepartmentChange(this.data.batch.department._id)
      this.patchForm()
    })
    
  }
  patchForm() {
    const batch = this.data.batch;
    const selectedBatch = this.batches.find(b => b.startYear === batch.batch.startYear && b.endYear === batch.batch.endYear);
    this.batchForm.patchValue({
      department: batch.department._id,
      batch: selectedBatch,
      tutor:batch.tutor._id,
      maxSeats:batch.maxSeats
    });
    console.log(this.batchForm.get('batch')?.value)
  }
  onDepartmentChange(departmentId: any) {
    let selectedDepartment:any;
    if(typeof departmentId == "string" ){
      selectedDepartment=this.departments.find((dep) => dep._id === departmentId);
    } else{
      selectedDepartment=this.departments.find((dep) => dep._id === departmentId.value); 
    }
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
    this.submitted = true;
    if(this.batchForm.valid){
      const batchData = {batchId:this.data.batch._id,...this.batchForm.value}
      this._batchService.updateBatch(batchData).subscribe((res)=>{
        if(res){
          this.dialogRef.close()
          this._snackBar.open("Batch Updated!", 'Close', {
            duration: 2000,
          });
        }
      })
    }
  }

}
