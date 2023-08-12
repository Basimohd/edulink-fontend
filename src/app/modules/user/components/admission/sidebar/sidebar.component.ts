import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { getApplicantForm, getCourseForm, getGuardianForm, getPreviousEducationForm } from '../store/form.selector';
import { Router } from '@angular/router';
import { ApplicantForm, CourseForm, GuardianForm, PreviousEducationForm } from '../store/form.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() currentStep!: number;
  @Output() handleNextStep = new EventEmitter<number>();
  
  applicantFormValid$: Observable<boolean> = this._store.select(getApplicantForm).pipe(
    map((applicantData: ApplicantForm) => applicantData.isValid)
  );

  courseFormValid$: Observable<boolean> = this._store.select(getCourseForm).pipe(
    map((courseData: CourseForm) => courseData.isValid)
  );

  guardianFormValid$: Observable<boolean> = this._store.select(getGuardianForm).pipe(
    map(( guardianData: GuardianForm) => guardianData.isValid)
  );

  previousEducationValid$: Observable<boolean> = this._store.select(getPreviousEducationForm).pipe(
    map((previousEducationData: PreviousEducationForm) => previousEducationData.isValid)
  );

  constructor(
    private _store:Store,
    private _router: Router
    ){}

  ngOnInit(){
    
  }

}