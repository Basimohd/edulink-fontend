import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private domain!: string | undefined;

  constructor(private http: HttpClient) { 
      this.domain = environment.domain;
  }
  verifyLogin(details: any): Observable<any> {
    return this.http.post<any>(`${this.domain}admin/login`, details)
  }
}
