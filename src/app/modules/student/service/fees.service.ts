import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class feesService {
    private domain!: string | undefined;

    constructor(private http: HttpClient) { 
        this.domain = environment.domain;
    }

    fetchFeesByDepartment(departmentId:string){
        console.log(departmentId)
        return this.http.get(`${this.domain}fees/${departmentId}`)
    }

    createCheckout(amount:number,userId:string | null,feeYear:any){
        return this.http.post(`${this.domain}user/checkout`, { amount,userId,feeYear });
    }
}