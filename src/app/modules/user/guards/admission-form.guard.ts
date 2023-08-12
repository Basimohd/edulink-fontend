import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { first, map, take } from 'rxjs/operators';
import { getApplicantForm, getCourseForm, getGuardianForm, getPreviousEducationForm } from '../components/admission/store/form.selector';
import { ApplicantForm, CourseForm, FormBase, GuardianForm, PreviousEducationForm } from '../components/admission/store/form.interface';

@Injectable({
  providedIn: 'root'
})
export class StepValidityGuard implements CanActivate {

  constructor(
    private _store: Store,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    switch (next.url[0].path) {
      case 'course-details':
        return this.checkFormValidity<ApplicantForm>(getApplicantForm);
      case 'guardian-details':
        return this.checkFormValidity<CourseForm>(getCourseForm);
      case 'previous-education':
        return this.checkFormValidity<GuardianForm>(getGuardianForm);
      case 'confirmation':
        return this.checkFormValidity<PreviousEducationForm>(getPreviousEducationForm);
      default:
        return of(true)
    }
  }

  private checkFormValidity<T extends FormBase>(formSelector: any): Observable<boolean> {
    return this._store.select(formSelector).pipe(
      take(1),
      map((formData: any) => formData as T),
      map((typedFormData: T) => typedFormData.isValid),
      map(isValid => {
        console.log()
        if (isValid) {
          return true;
        } else {
          this._router.navigate(['/admission'])
          return false;
        }
      })
    );
  }
}
