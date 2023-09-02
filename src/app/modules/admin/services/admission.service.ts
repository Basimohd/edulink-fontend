import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admissionStatus } from '../components/admission/admission.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private domain!: string | undefined;

  constructor(private http:HttpClient) { 
        this.domain = environment.domain;

  }

  fetchAdmissionEnquiries():Observable<any>{
    return this.http.get<any>(`${this.domain}admin/admissions`)
  }

  updateAdmissionStatus(admissionId: string, status: admissionStatus,departmentBatch?: any,): Observable<any> {
    const url = `${this.domain}admin/admission/${admissionId}/status`;
    const payload = { status: status,departmentBatch:departmentBatch };
    return this.http.patch(url, payload);
  }

  fetchBatchesByDepartment(departmentId: string){
    return this.http.get<any>(`${this.domain}admin/batch/${departmentId}`)
  } 
}
