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

    registerStudent(registerForm: any): Observable<any> {
        return this.http.post(`${this.domain}user/register`, registerForm)
    }

    verifyOtp(otp: string, userId: string): Observable<any> {
        return this.http.post(`${this.domain}user/verifyOtp`, { otp, userId })
    }

    verifyLogin(details: any): Observable<any> {
        return this.http.post<any>(`${this.domain}user/login`, details)
    }

    registerWithGoogle(credential: any): Observable<any> {
        const header = new HttpHeaders().set('Content-Type', 'application/json');
        const body = { credential };
        return this.http.post(`${this.domain}user/loginWithGoogle`, body, { withCredentials: true });
    }
}