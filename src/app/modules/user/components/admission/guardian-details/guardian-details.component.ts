import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { getGuardianForm } from '../store/form.selector';
import { GuardianForm } from '../store/form.interface';
import { updateGuardianForm } from '../store/form.action';

@Component({
  selector: 'app-guardian-details',
  templateUrl: './guardian-details.component.html',
  styleUrls: ['./guardian-details.component.css']
})
export class GuardianDetailsComponent {
  submitted: boolean = false;
  guardianForm = this.fb.group({
    guardianName: ['', [Validators.required]],
    relation: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    guardianPhone: ['', [Validators.required, Validators.pattern(GlobalConstants.telPattern)]],
  });

  constructor(private fb: FormBuilder,
    private _store: Store,
    private _router: Router
  ) { }

  get f() {
    return this.guardianForm.controls;
  }


  ngOnInit(){
    this.patchFormWithLastState();
    this.setupFormSubscription()
  }

  patchFormWithLastState() {
    this._store
      .select(getGuardianForm)
      .pipe(take(1))
      .subscribe((applicantData: any) => {
        this.guardianForm.patchValue(applicantData.data, { emitEvent: false });
      });
  }

  setupFormSubscription() {
    this.guardianForm.valueChanges.subscribe((formValues: any) => {
      const guardianData: GuardianForm ={
        data: formValues as GuardianForm["data"],
        isValid:this.guardianForm.valid
      }
      this._store.dispatch(updateGuardianForm({ payload: guardianData }));
    });
  }

  goToNextStep() {
    if (!this.guardianForm.valid) {
      this.submitted = true;
      return;
    }
    this._router.navigate(['admission/previous-education'])
  }
  goToBackStep(){
    this._router.navigate(['admission/course-details'])
  }
}
