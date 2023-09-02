import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../../service/chat.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  studentData!:any[]
  facultyData:any[]=[];
  faTrash = faTrash;
  studentId = localStorage.getItem('userId')

  constructor(
    private _fb:FormBuilder,
    private _chatService: ChatService,
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,

  ){
  }
  
  ngOnInit(){
    this.getFacultiesAndStudentByDepartment()
  }

  removeFaculty(index: number){
      this.facultyFormArray.removeAt(index);
  }

  removeStudent(index: number){
    this.studentFormArray.removeAt(index);
  }

  groupForm = this._fb.group({
    groupName:['',Validators.required],
    studentParticipants: this._fb.array([], [Validators.required]),
    facultyParticipants: this._fb.array([], [Validators.required])
  })

  getFacultiesAndStudentByDepartment(){
    const studentId = localStorage.getItem('userId');
    this._chatService.getFacultiesAndStudentByDepartment(studentId).subscribe((res:any)=>{
      this.studentData = res.studentList;
      res.studentList.forEach((student:any)=>{
        if(student._id === studentId){
          this.studentFormArray.push(new FormControl(student._id));
        }
      })
      res.facultyList.forEach((department:any)=>{
        if(!this.facultyData.includes(department.HOD)){
            this.facultyData.push(department.HOD)
        }
        department.professors.forEach((professor:any)=>{
          if(!this.facultyData.includes(professor)){
            this.facultyData.push(professor);
          }
        })
      })
    })
  }
  onSubmit(){
    if(this.groupForm.valid){
      const groupForm = {
        communityId:this.data.communityId,
        ...this.groupForm.value,
      }
      this._chatService.addGroup(groupForm).subscribe((res)=>{
        if(res){
          this._snackBar.open("Group Added!", 'Close', {
            duration: 2000,
          });
          this.dialogRef.close()
        }
      })  
    }
  }

  get studentFormArray(): FormArray {
    return this.groupForm.get('studentParticipants') as FormArray;
  }
  get facultyFormArray(): FormArray {
    return this.groupForm.get('facultyParticipants') as FormArray;
  }

  addStudent(event: Event | null) {
    if (event instanceof Event) {
      const selectedStudentId = event.target as HTMLInputElement;
      if (selectedStudentId.value) {
        const studentId = selectedStudentId.value;
        const isStudentAlreadyAdded = this.studentFormArray.value.includes(studentId);
        
        if (!isStudentAlreadyAdded) {
          this.studentFormArray.push(new FormControl(studentId));
        }
      }
    }
  } 

  addFaculty(event: Event | null) {
    if (event instanceof Event) {
      const selectedFacultyId = event.target as HTMLInputElement;
      if (selectedFacultyId.value) {
        const facultyId = selectedFacultyId.value;
        const isFacultyAlreadyAdded = this.facultyFormArray.value.includes(facultyId);
        if (!isFacultyAlreadyAdded) {
          this.facultyFormArray.push(new FormControl(facultyId));
        }
      }
    }
  } 

  getStudentNameById(studentId: string): string {
    const student = this.studentData.find((student) => student._id === studentId);
    return student ? student.username : '';
  }
  
  getFacultyNameById(facultyId: string): string {
    const faculty = this.facultyData.find((faculty) => faculty._id === facultyId);
    return faculty ? faculty.facultyName : '';
  }

  getControl(name: any): AbstractControl | null {
    return this.groupForm.get(name);
  }
}
