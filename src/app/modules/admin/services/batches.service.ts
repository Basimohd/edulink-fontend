import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  createBatch(formData: any): Observable<any> {
    return this.http.post(`${this.domain}admin/add-batch`, formData)
  }

  updateBatch(formData: any): Observable<any> {
    return this.http.patch(`${this.domain}admin/update-batch`, formData)
  }

  fetchDepartment() {
    return this.http.get(`${this.domain}admin/batches`);
  }
}
