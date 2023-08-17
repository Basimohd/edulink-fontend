import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AssingmentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    fetchDepartmentByFaculty(facultyId: any): Observable<any> {
        return this.http.get(`${this.domain}faculty/deparmtnet/${facultyId}`)
    }

    addAssignment(assignmentForm: any,facultyId:string | null): Observable<any> {
        return this.http.post(`${this.domain}faculty/addAssignment/${facultyId}`,assignmentForm)
    }

    fetchAssignments(facultyId:string | null){
        return this.http.get(`${this.domain}faculty/assignment/${facultyId}`)
    }

    updateGrade(grade:number,submissionId:string){
        return this.http.patch(`${this.domain}faculty/update-grade/${submissionId}`,{grade})
    }
}