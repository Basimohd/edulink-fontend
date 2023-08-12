import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.css']
})

export class EditFacultyComponent {
  facultyData!:any;
  faSpinner = faSpinner;
  isLoading = false;
  submitted: boolean = false;
  facultyForm!: FormGroup;
  file!: File;
  previewUrl!: string | ArrayBuffer | null;
  formError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: FacultyService,
    public dialogRef: MatDialogRef<EditFacultyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.facultyData = this.data.facultyData
    this.file = this.facultyData.profilePicture
    this.facultyForm = this.fb.group({
      facultyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
      email: ['', [Validators.required, Validators.email]],
      mainSubject: ['', [Validators.required]],
    })
    this.facultyForm.patchValue(this.facultyData);
  }


  onSubmit() {
    this.submitted = true;
    this.formError = false;
    if (this.facultyForm.valid) {
      let formData = new FormData();
      if (this.facultyForm && this.facultyForm.controls) {
        formData.append('file', this.file)
        formData.append('facultyId',this.facultyData._id)
        Object.keys(this.facultyForm.controls).forEach((controlName: string) => {
          const control = this.facultyForm.get(controlName);
          if (control && control.valid) {
            const value = control.value;
            formData.append(controlName, value);
          }
        });
      }
      this.isLoading = true
      console.log(formData)
      this.service.updateFaculty(formData).subscribe(
        (res: any) => {
          if (res.facultyId) {
            this.isLoading = false
            this.dialogRef.close()
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } else {
      this.formError = true;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.previewImage();
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.file!);
  }
}
