import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserDetails } from '../interfaces/user.interface'

@Injectable({ providedIn: 'root' })
export class studentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    getUserDetails(userId:string|null){
        return this.http.get<UserDetails>(`${this.domain}user/${userId}`)
    }

    fetchDepartment(){
        return this.http.get(`${this.domain}user/departments`);
    }

}