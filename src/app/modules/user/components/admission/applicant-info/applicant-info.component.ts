import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ageValidator } from '../../../../../common/validators/age.validator';
import { Store } from '@ngrx/store';
import { updateApplicantForm } from '../store/form.action';
import { ApplicantForm } from '../store/form.interface';
import { getApplicantForm } from '../store/form.selector';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css']
})
export class ApplicantInfoComponent {
  submitted: boolean = false;
  applicantForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    studentEmail: ['', [Validators.required, Validators.email]],
    dob: ['', [Validators.required, ageValidator]],
    gender: [null, [Validators.required]],
    studentPhone: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
    address: ['', [Validators.required]],
  },    {
    updateOn: 'blur'
  });

  constructor(
    private fb: FormBuilder,
    private _store: Store,
    private _router: Router
  ) { }

  get f() {
    return this.applicantForm.controls;
  }
  ngOnInit(){
    this.patchFormWithLastState();
    this.setupFormSubscription()
  }

  patchFormWithLastState() {
    this._store
      .select(getApplicantForm)
      .pipe(take(1))
      .subscribe((applicantData: any) => {
        this.applicantForm.patchValue(applicantData.data, { emitEvent: false });
      });
  }

  setupFormSubscription() {
    this.applicantForm.valueChanges.subscribe((formValues: any) => {
      const applicantData: ApplicantForm ={
        data: formValues as ApplicantForm["data"],
        isValid:this.applicantForm.valid
      }
      this._store.dispatch(updateApplicantForm({ payload: applicantData }));
    });
  }
  goToNextStep() {
    if (!this.applicantForm.valid) {
      this.submitted = true;
      return;
    }
    this._router.navigate(['admission/course-details'])
  }
}