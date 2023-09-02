import { Component } from '@angular/core';
import { authService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  passErr!: string;
  submit: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  accessError: boolean = false;
  loginForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: authService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(GlobalConstants.passPattern)]],
    })

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.google_client_id,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: false
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: 324,height: 200,text: "continue_with", }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
      
      // @ts-ignore
      google.accounts.id.cancel();
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.service.registerWithGoogle(response.credential).subscribe(
      (res) => {
        this.loginRes(res)
      },(err: HttpErrorResponse) => {
        this.resErrHandler(err)
      }
    );
  }

    getControl(name: any): AbstractControl | null {
    return this.loginForm.get(name);
  }


  onSubmit() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.verifyUser(this.loginForm.value)
    }
  }

  verifyUser(formData: any) {
    const details = formData
    this.service.verifyLogin(details).subscribe((res) => {
      this.loginRes(res)
    },(err: HttpErrorResponse) => {
      this.resErrHandler(err)
    })
  }

  loginRes(res:any) {
    localStorage.setItem('userToken', res.token)
    localStorage.setItem('userId', res.id)
    if (!res.data.admssionDetails) {
      this.router.navigate(['/admission'])
    }else{
      this.router.navigate(['/student'])
    }
  }
  resErrHandler(err: HttpErrorResponse) {
    let errMsg!: string;
    if (err.status === 401) {
      let error = err.error.error;
      switch (error) {
        case "access":
          errMsg = "Access Denied Please Verify with Otp"
          break;
        case "password":
          errMsg = "Entered Password Is incorrect"
          break;
        case "email":
          errMsg = "Account Not Found."
          break;
        default:
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
  }

}
