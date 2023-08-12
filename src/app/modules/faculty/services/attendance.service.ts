import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class attendanceService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    updateAttendance(payload: any): Observable<any> {
        return this.http.post(`${this.domain}faculty/attendance`,payload)
    }
}