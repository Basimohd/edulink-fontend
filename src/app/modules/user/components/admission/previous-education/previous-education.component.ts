import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPreviousEducationForm } from '../store/form.selector';
import { take } from 'rxjs';
import { PreviousEducationForm } from '../store/form.interface';
import { updatePreviousEducationForm } from '../store/form.action';

@Component({
  selector: 'app-previous-education',
  templateUrl: './previous-education.component.html',
  styleUrls: ['./previous-education.component.css']
})
export class PreviousEducationComponent {
  submitted:boolean = false;
  previouseducationForm = this.fb.group({
    previousInstitute: ['', [Validators.required]],
    courseStudied: ['', [Validators.required]],
    passingYear: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private _store: Store,
    private _router: Router
  ) { }

  get f() {
    return this.previouseducationForm.controls;
  }

  ngOnInit(){
    this.patchFormWithLastState();
    this.setupFormSubscription()
  }

  patchFormWithLastState() {
    this._store
      .select(getPreviousEducationForm)
      .pipe(take(1))
      .subscribe((applicantData: any) => {
        this.previouseducationForm.patchValue(applicantData.data, { emitEvent: false });
      });
  }

  setupFormSubscription() {
    this.previouseducationForm.valueChanges.subscribe((formValues: any) => {
      const applicantData: PreviousEducationForm ={
        data: formValues as PreviousEducationForm["data"],
        isValid:this.previouseducationForm.valid
      }
      this._store.dispatch(updatePreviousEducationForm({ payload: applicantData }));
    });
  }
  goToNextStep() {
    if (!this.previouseducationForm.valid) {
      this.submitted = true;
      return;
    }
    this._router.navigate(['admission/confirmation'])
  }
  goToBackStep(){
    this._router.navigate(['admission/guardian-details'])
  }
}
