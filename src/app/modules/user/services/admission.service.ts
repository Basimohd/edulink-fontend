import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interfaces/user.interface'
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class admissionService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }
    createAdmission(formData:FormData){
        return this.http.post(`${this.domain}user/admission`,formData)
    }
  
}