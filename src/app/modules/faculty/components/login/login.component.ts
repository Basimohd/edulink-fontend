import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passErr: string = ''
  constructor(
    private _fb: FormBuilder,
    private _authService: authService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createFacultyForm();
  }

  createFacultyForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(GlobalConstants.passPattern)]],
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.loginForm.get(name);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.verifyLogin(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('facultyToken', res.token)
        localStorage.setItem('facultyId', res.id)
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
          title: 'Logined successfully'
        })
        this._router.navigate(['faculty']);
      }, (err: HttpErrorResponse) => {
        let errMsg!: string;
        if (err.status === 409) {
          errMsg = err.error.error;
        } else {
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
    }
  }

}
