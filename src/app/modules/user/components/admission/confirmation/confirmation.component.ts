import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateImageUpload } from '../store/form.action';
import { getAdmissionForm, getImageFile } from '../store/form.selector';
import { take } from 'rxjs';
import Swal from 'sweetalert2';
import { FormState } from '../store/form.interface';
import { admissionService } from '../../../services/admission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  file!: File;
  message: string = ''
  previewUrl!: string | ArrayBuffer | null;
  submitted: boolean = false;
  form!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private _store: Store,
    private _router: Router,
    private admissionService: admissionService,
    private router: Router,
    private _formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.createForm();
    this.patchFormWithLastState();
  }

  createForm() {
    this.form = this._formBuilder.group({
      imageFile: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onFileChange(file: any) {
    if (file) {
      this.file = file;
      this.previewImage();
      console.log(this.file)
      this.setupImageSubscription()
      if (this.message) {
        this._snackBar.open("Successfully upload!", 'Close', {
          duration: 2000,
        });
      }
      this.message = ''
    }

  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.file!);
  }
  onValidationMessage(message: any): void {
    this.message = message
  }


  patchFormWithLastState() {
    this._store
      .select(getImageFile)
      .pipe(take(1))
      .subscribe((imageFile: any) => {
        this.file = imageFile
        this.previewImage()
      });
  }

  setupImageSubscription() {
    if (this.file) {
      this._store.dispatch(updateImageUpload({ payload: this.file }))
    }
  }
  goToBackStep() {
    this._router.navigate(['admission/previous-education'])
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid){
    let admissionForm: any;
    this._store.select(getAdmissionForm).subscribe((formState: FormState) => {
      const { data: applicantData } = formState.applicantForm;
      const { data: courseData } = formState.courseForm;
      const { data: guardianData } = formState.guardianForm;
      const { data: previousEducationData } = formState.previouseducationForm;
      admissionForm = {
        ...applicantData,
        ...courseData,
        ...guardianData,
        ...previousEducationData,
      };


      if (formState.imageFile) {
        let formData = new FormData();
        let userId = localStorage.getItem('userId')
        if (admissionForm && userId) {
          formData.append('userId', userId);
          formData.append('file', this.file);

          Object.keys(admissionForm).forEach((controlName) => {
            const value = admissionForm[controlName];
            formData.append(controlName, value);
          });
        }
        this.admissionService.createAdmission(formData).subscribe((res: any) => {
          if (res.user) {
            Swal.fire({
              title: '<span style="font-size: 24px">Thanks for applying to our school!</span>',
              html: '<span style="font-size: 18px; padding-top: -30px">Please bring all required documents for the admission process when submitting your application.</span>',
              icon: 'success'
            });
            this.router.navigate(['/admission-status'])
          } else {

          }
        });
      } else {

      }
    });
  }
  }
}
