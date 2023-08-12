import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { studentService } from '../../../service/student.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent {
  constructor(
    private _fb: FormBuilder,
    private _studentService: studentService,
    public dialogRef: MatDialogRef<LeaveApplicationComponent>,
  ) { }

  minDate!: string;
  dayDiff:number = 0;
  dayErr!:string;
  leaveForm = this._fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    totalDays: [0],
    reason: ['', Validators.required],
  })

  ngOnInit() {
    this.leaveForm.valueChanges.subscribe((data) => {
      let currentDate = moment();
      let startDate = moment(data.startDate);
      let endDate = moment(data.endDate);
    
      // Reset errors
      this.dayErr = '';
      
       if (startDate.isAfter(endDate)) {
        this.dayErr = 'Start date must be before end date.';
      } else if (startDate.isBefore(currentDate, 'day') || endDate.isBefore(currentDate, 'day')) {
        this.dayErr = "Cannot select yesterday's date or earlier.";
        this.dayDiff = 0
      } else {
        let totalDays = endDate.diff(startDate, 'days') + 1;
        if (isNaN(totalDays) || totalDays < 0) {
          this.dayDiff = 0;
        } else {
          const MAX_TOTAL_DAYS = 365;
          if (totalDays > MAX_TOTAL_DAYS) {
            this.dayErr = 'Total days exceeds maximum limit.';
          } else {
            data.totalDays = totalDays;
            this.dayDiff = totalDays;
          }
        }
      }
    });
    
  }

  onSubmit(){
    if(this.leaveForm.valid){
      this._studentService.applyLeave(this.leaveForm.value).subscribe((res)=>{
        if(res){
          this.dialogRef.close()
        }
      })
    }
  }

}
