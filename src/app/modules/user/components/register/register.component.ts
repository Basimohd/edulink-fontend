import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../../services/auth.service';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isLoggedin: boolean = false;
  passErr: string = "";
  hide = true;
  chide = true

  constructor(
    private fb: FormBuilder,
    private service: authService,
    public dialog: MatDialog,
    private router: Router,
    private elementRef: ElementRef
  ) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(GlobalConstants.passPattern)]],
      cPassword: ['', Validators.required],
    })
  }


  onSubmit() {
    const { fullName, email, password, cPassword } = this.registerForm.value
    if (this.registerForm.valid) {
      if (password == cPassword) {
        this.passErr = ""
        this.service.registerStudent(this.registerForm.value).subscribe((res) => {
          console.log(res)
          const dialogRef = this.dialog.open(OtpModalComponent, {
            height: '340px',
            width: '470px',
            data: { email: this.registerForm.value.email, userId: res.userId },
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Registered successfully'
            })
            this.router.navigate(['/login'])
          })

        }, (err: HttpErrorResponse) => {
          let errMsg!: string;
          if (err.status === 409) {
            errMsg = err.error.error;
          } else {
            console.log(err.message)
            errMsg = 'An error occurred. Please try again later'
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: errMsg
          })
        })
      } else {
        this.passErr = "The passwords do not match. Please Confirm It."

      }
    }
  }
}

