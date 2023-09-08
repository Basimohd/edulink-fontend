import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ageValidator } from 'src/app/common/validators/age.validator';
import { DepartmentService } from 'src/app/modules/admin/services/department.service';
import { getCourseForm } from '../store/form.selector';
import { CourseForm } from '../store/form.interface';
import { updateCourseForm } from '../store/form.action';
import { studentService } from '../../../services/student.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  submitted: boolean = false;
  departments: any[] = []
  courseForm = this.fb.group({
    department: [null, [Validators.required]],
    quota: [null, [Validators.required]],
    admissionType: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private departmentService: studentService,
    private _store: Store,
    private _router: Router
  ) { }

  ngOnInit() {
    this.departmentService.fetchDepartment().subscribe((res: any) => {
      this.departments = res.departments
    })
    this.patchFormWithLastState();
    this.setupFormSubscription()
  }
  get f() {
    return this.courseForm.controls;
  }

  patchFormWithLastState() {
    this._store
      .select(getCourseForm)
      .pipe(take(1))
      .subscribe((applicantData: any) => {
        this.courseForm.patchValue(applicantData.data, { emitEvent: false });
      });
  }

  setupFormSubscription() {
    this.courseForm.valueChanges.subscribe((formValues: any) => {
      const courseData: CourseForm = {
        data: formValues as CourseForm["data"],
        isValid: this.courseForm.valid
      }
      console.log(courseData)
      this._store.dispatch(updateCourseForm({ payload: courseData }));
    });
  }

  goToNextStep() {
    if (!this.courseForm.valid) {
      this.submitted = true;
      return;
    }
    this._router.navigate(['admission/guardian-details'])
  }
  goToBackStep(){
    this._router.navigate(['admission/applicant-info'])
  }
}
