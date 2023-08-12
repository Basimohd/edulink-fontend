import { Component } from '@angular/core';
import { ClassService } from './class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  classForm!:FormGroup
  breadcrumbName="Classes"
  classOptions: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
  divison:any="";
  classList!:any[]
  constructor(private classService : ClassService,private fb:FormBuilder){}

  ngOnInit(){
    this.classForm = this.fb.group({
      classNumber:['',[Validators.required]],
      maxStudents:['',[Validators.required]],
    })
    this.loadClasses()
  }

  loadClasses(){
    this.classService.fetchAllService().subscribe((res:any)=>{
      this.classList = res.allClass;
    })
  }

  onClass(classNumber:any){
    this.classService.fetchDivision(Number(classNumber.value)).subscribe((res)=>{
      if(res.classDivision){
        this.divison = res.classDivision;
      }
    })
  }
  
  onSubmit(){
    const classNumber = parseInt(this.classForm.get('classNumber')?.value as string)
    const maxStudents = parseInt(this.classForm.get('maxStudents')?.value as string)
    const division:string = this.divison
    const classForm = {
      classNumber,
      maxStudents,
      division
    }
    this.classService.createClass(classForm).subscribe()
  }
}
