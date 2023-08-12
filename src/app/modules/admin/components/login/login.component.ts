import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  passErr!:string;
  submit:boolean=false;
  emailError: boolean = false;
  passwordError: boolean = false;
  accessError: boolean = false;

  constructor(private fb:FormBuilder, private service:AuthService, private router: Router){}
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(GlobalConstants.passPattern)]],
  })
  
  onSubmit() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.verifyUser(this.loginForm.value)
    }
  }

  verifyUser(formData: any) {
    const details = formData
    this.service.verifyLogin(details).subscribe((res) => {
        localStorage.setItem('adminToken', res.token)
        localStorage.setItem('adminId', res.id)
        this.router.navigate(['/admin/dashboard']);
    },(err: HttpErrorResponse) => {
      let errMsg!:string;
      if (err.status === 401) {
        let error = err.error.error;
        switch (error) {
          case "password":
          errMsg = "Entered Password Is incorrect"
          break;
          case "email":
          errMsg = "Account Not Found."
          break;
        }
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

    setTimeout(() => {
      this.emailError = false
      this.passwordError = false
    }, 2000)
  }
}
