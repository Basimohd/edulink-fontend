import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    fetchAssignmentsByDepartment(studentId:string | null){
        return this.http.get(`${this.domain}user/assignment/${studentId}`)
    }

    uploadAssignmentFile(data:any){
        return this.http.patch(`${this.domain}user/assignment/upload-file`,data)
    }

    deleteFile(data:any){
        return this.http.delete(`${this.domain}user/assignment/delete-file`,{body:data})
    }
}