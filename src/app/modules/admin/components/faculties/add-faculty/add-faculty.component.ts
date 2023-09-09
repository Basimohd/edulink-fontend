import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent {
  faSpinner = faSpinner;
  isLoading:boolean = false;
  submitted: boolean = false;
  facultyForm!: FormGroup;
  file!: File | null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: FacultyService,
    public dialogRef: MatDialogRef<AddFacultyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.facultyForm = this.fb.group({
      facultyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
      email: ['', [Validators.required, Validators.email]],
      mainSubject: ['', [Validators.required]],
    })
  }

  
  onSubmit() {
    this.submitted = true;
    if (this.facultyForm.valid) {
      let formData = new FormData();
      if (this.facultyForm && this.facultyForm.controls && this.file) {
        formData.append('file', this.file as File)
        Object.keys(this.facultyForm.controls).forEach((controlName: string) => {
          const control = this.facultyForm.get(controlName);
          if (control && control.valid) {
            const value = control.value;
            formData.append(controlName, value);
          }
        });
      }
      this.isLoading = true
      this.service.createFaculty(formData).subscribe(
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
    }
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const fileSize = selectedFile.size / (1024 * 1024); // Convert to MB
  
      if (fileSize <= 2 && selectedFile.type.startsWith('image/')) {
        this.file = selectedFile;
        this.errorMessage = null; // Reset error message if conditions are met
      } else {
        this.file = null;
        this.errorMessage = 'Please select a valid image file (up to 2MB).';
        event.target.value = '';
      }
    }
  }
}
