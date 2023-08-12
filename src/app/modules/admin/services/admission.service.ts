import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admissionStatus } from '../components/admission/admission.enum';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http:HttpClient) { }

  fetchAdmissionEnquiries():Observable<any>{
    return this.http.get<any>('http://localhost:3000/admin/admissions')
  }

  updateAdmissionStatus(admissionId: string, status: admissionStatus,departmentBatch?: any,): Observable<any> {
    const url = `http://localhost:3000/admin/admission/${admissionId}/status`;
    const payload = { status: status,departmentBatch:departmentBatch };
    return this.http.patch(url, payload);
  }

  getDivision(classSelect:string):Observable<any>{
    let selectedClass = Number(classSelect)
    return this.http.get<any>(`http://localhost:3000/class/divisions?classNum=${selectedClass}`);
  }

  fetchBatchesByDepartment(departmentId: string){
    return this.http.get<any>(`http://localhost:3000/admin/batch/${departmentId}`)
  } 
}
