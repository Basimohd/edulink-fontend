import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  authToken!:string | null;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAdminRequest = request.url.includes("admin");
    const isFacultyRequest = request.url.includes("faculty");
    const isUserRequest = request.url.includes("user");
    if (isAdminRequest) {
      this.authToken = localStorage.getItem('adminToken')
    } else if (isFacultyRequest) {
      this.authToken = localStorage.getItem('facultyToken')
    } else if(isUserRequest){
      this.authToken = localStorage.getItem('userToken')
    }
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message)
        if (error.status === 401) {
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
            title: error.error.error
          })
        }
        return throwError(error);
      })
    );
  }
}
