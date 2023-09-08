import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/chat/messages') || request.url.includes('/loadAllChats')) {
      return next.handle(request);
    }
    
    this.loader.show()
    return next.handle(request).pipe(
      finalize(()=>{
        this.loader.hide()
      })
    )
  }
}