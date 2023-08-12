import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { NgOtpInputComponent } from 'ng-otp-input';
import { authService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css']
})
export class OtpModalComponent {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  faSpinner = faSpinner;
  isLoading = false;
  errMsg!:string;
  constructor(
    public dialogRef: MatDialogRef<OtpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: authService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOtpChange(otp: string) {
    if (otp.length == 6) {
      console.log(this.data.userId)
      this.isLoading = true
      this.ngOtpInput.otpForm.disable();
      this.service.verifyOtp(otp, this.data.userId).subscribe((res) => {
        this.errMsg = ""
        if (res) {
          this.dialogRef.close();
        } else {
          this.errMsg = "OTP is incorrect.Please Try again"
          this.isLoading = false
          this.ngOtpInput.otpForm.enable();
        }
      })
    }
  }
  onClick(idx: number): void {


  }
}
