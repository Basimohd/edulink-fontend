import { Component } from '@angular/core';
import { facultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  facultyData!:any;
  constructor(
    private _facultyService : facultyService
  ){}

  ngOnInit(){
    const facultyId = localStorage.getItem('facultyId')
    this._facultyService.getFacultyData(facultyId).subscribe((res)=>{
      this.facultyData = res;
    })
  }
}
