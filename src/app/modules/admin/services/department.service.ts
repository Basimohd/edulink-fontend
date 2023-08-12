import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DepartmentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }
    
    createDepartment(formData:any):Observable<any>{
        return this.http.post(`${this.domain}admin/add-department`,formData)
    }

    updateDepartment(formData:any):Observable<any>{
        return this.http.patch(`${this.domain}admin/update-department`,formData)
    }

    fetchDepartment(){
        return this.http.get(`${this.domain}admin/departments`);
    }
}