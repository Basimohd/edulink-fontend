import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class authService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    registerFaculty(registerForm: any): Observable<any> {
        return this.http.post(`${this.domain}faculty/register`, registerForm)
    }

    verifyLogin(loginForm: any): Observable<any> {
        return this.http.post<any>(`${this.domain}faculty/login`, loginForm)
    }
}