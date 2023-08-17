import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/global-constants';
import { authService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {
  registerForm!: FormGroup;
  passErr:string =''
  token:string | null= ""
  constructor(
    private _fb: FormBuilder,
    private _authService:authService,
    private _router : Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createFacultyForm();
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token')
    });
  }

  createFacultyForm() {
    this.registerForm = this._fb.group({
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
       const registerForm ={
        ...this.registerForm.value,
        token:this.token
       }
        this._authService.registerFaculty(registerForm).subscribe((res) => {
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
          let errMsg: string = 'Something went wrong!'
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
