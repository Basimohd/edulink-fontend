import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../../user/interfaces/user.interface';


@Injectable({ providedIn: 'root' })
export class studentService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    getUserDetails(userId:string|null){
        return this.http.get<UserDetails>(`${this.domain}user/${userId}`)
    }

    applyLeave(leaveForm : any){
        let userId = localStorage.getItem('userId')
        return this.http.post(`${this.domain}user/leaveApplication/${userId}`,leaveForm)
    }

    deleteLeave(id:string){
        let userId = localStorage.getItem('userId');
        return this.http.delete(`${this.domain}user/deleteLeave/${userId}/${id}`)
    }
}