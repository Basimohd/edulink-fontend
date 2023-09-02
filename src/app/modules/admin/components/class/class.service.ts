import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpClient) { }

  fetchDivision(classNumber:number):Observable<any> {
    let params = new HttpParams();
    params = params.set('classNum', classNumber);
      return this.http.get('api.edulinkcollege.online/class/division',{params:params})
  }

  createClass(classDatas:any):Observable<any> {
      return this.http.post('api.edulinkcollege.online/class/addClass',classDatas)
  }
  
  fetchAllService(){
    return this.http.get('api.edulinkcollege.online/class')
  }

}
