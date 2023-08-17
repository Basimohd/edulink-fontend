import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssingmentService } from '../../../services/assignment.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent {
  
  assignmentDetails!:any;
  constructor(
    private route:ActivatedRoute,
    private _assignmentService:AssingmentService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.assignmentDetails = history.state
    })
  }
  
  changeGrade(submissionId:string,event:Event){
    let grade = Number((event.target as HTMLInputElement).value)
    console.log(submissionId,(event.target as HTMLInputElement).value);
    this._assignmentService.updateGrade(grade,submissionId).subscribe((res:any)=>{

    })
  }
}
