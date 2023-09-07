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
      return this.http.get('http://localhost:3000/class/division',{params:params})
  }

  createClass(classDatas:any):Observable<any> {
      return this.http.post('http://localhost:3000/class/addClass',classDatas)
  }
  
  fetchAllService(){
    return this.http.get('http://localhost:3000/class')
  }

}
