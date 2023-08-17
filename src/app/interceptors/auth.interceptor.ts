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
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
  ) {}
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
        const roleRoutes = {
          admin: '/admin/login',
          faculty: '/faculty/login',
          user: '/login'
        };
        if (error.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'Login',
            allowOutsideClick: false, 
          }).then((result) => {
            if (result.isConfirmed) {
              const role = isAdminRequest ? 'admin' : (isFacultyRequest ? 'faculty' : 'user');
              
              localStorage.removeItem(`${role}Token`);
              localStorage.removeItem(`${role}Id`);
              
              this._router.navigate([roleRoutes[role]]);
            }
          });
        }
        return throwError(error);
      })
    );
  }
}
