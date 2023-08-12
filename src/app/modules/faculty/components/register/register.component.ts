import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/global-constants';
import { authService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  passErr:string =''
  constructor(
    private _fb: FormBuilder,
    private _authService:authService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.createFacultyForm();
  }

  createFacultyForm() {
    this.registerForm = this._fb.group({
      facultyID: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required,Validators.pattern(GlobalConstants.passPattern)]],
      confirmPassword: ['', [Validators.required,Validators.pattern(GlobalConstants.passPattern)]],
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }

  onSubmit(){
    const { password, confirmPassword } = this.registerForm.value
    if (this.registerForm.valid) {
      if (password == confirmPassword) {
        this.passErr = ""
       
        this._authService.registerFaculty(this.registerForm.value).subscribe((res) => {
          console.log(res)

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
            this._router.navigate(['faculty/login'])

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
