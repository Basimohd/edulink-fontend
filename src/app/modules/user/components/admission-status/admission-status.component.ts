import { Component } from '@angular/core';
import { AdmissionMessageService } from '../../services/admission-message.service';
import Swal from 'sweetalert2';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { admissionService } from '../../services/admission.service';
import { admissionStatus } from './admission.enum';
import { studentService } from '../../services/student.service';

@Component({
  selector: 'app-admission-status',
  templateUrl: './admission-status.component.html',
  styleUrls: ['./admission-status.component.css']
})
export class AdmissionStatusComponent {
  constructor
  (private admissionMessageService: AdmissionMessageService,
     private fb: FormBuilder,
     private admissionService:admissionService,
     private studentService:studentService) { }
  user!:any;
  userId = localStorage.getItem('userId')
  AdmissionStatus = admissionStatus;
  ngOnInit(): void {
    if(this.userId){
      this.studentService.getUserDetails(this.userId).subscribe((res:any)=>{
        this.user = res.admssionDetails
        console.log(res.admssionDetails)
      })
    }
    this.admissionMessageService.admissionMessage$.subscribe((message) => {
      if (message) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: message
        })
      }
    });
  }


  

}