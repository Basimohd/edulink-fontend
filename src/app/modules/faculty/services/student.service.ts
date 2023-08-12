import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class studentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    fetchStudentsByDepartment(facultyId: string | null): Observable<any> {
        return this.http.get(`${this.domain}user/students/${facultyId}`)
    }
    updateLeaveStatus(updateData: any): Observable<any> {
        return this.http.patch(`${this.domain}user/updateLeave`,updateData)
    }
}