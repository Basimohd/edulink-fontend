import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class FacultyService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }
    createFaculty(formData:FormData):Observable<any>{
        return this.http.post(`${this.domain}admin/add-faculty`,formData)
    }
    updateFaculty(formData:FormData):Observable<any>{
        return this.http.patch(`${this.domain}admin/update-faculty`,formData)
    }

    fetchFaculties(){
        return this.http.get(`${this.domain}admin/faculties`);

    }
}