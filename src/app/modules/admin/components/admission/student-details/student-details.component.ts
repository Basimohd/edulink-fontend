import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdmissionService } from '../../../services/admission.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  studentDetails!:any;
  constructor(
    public dialogRef: MatDialogRef<StudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(){
      this.studentDetails = this.data.admissionDetails
    }
}
