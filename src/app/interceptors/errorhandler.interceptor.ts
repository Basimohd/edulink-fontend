import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SnackbarService } from '../shared/services/snackbar.service';

@Injectable()
export class ErrorhandlerInterceptor implements HttpInterceptor {

  constructor(
    private _notificationService: SnackbarService
  ) {
    this._notificationService.initQueueWatcher();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this._notificationService.showError("Resource not found.");
          } else {
            this._notificationService.showError("An error occurred. Please try again later.");
          }
        } else {
          this._notificationService.showError("An error occurred. Please try again later.");
        }
        return throwError(error);
      })
    );
  }
}
