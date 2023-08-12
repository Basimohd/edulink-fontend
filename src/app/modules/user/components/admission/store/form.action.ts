import { createAction, props } from "@ngrx/store"
import { ApplicantForm, CourseForm, FormState, GuardianForm, PreviousEducationForm } from "./form.interface";


export const fetchDepartments = createAction('[Department] Fetch Departments');

// export const fetchDepartmentsSuccess = createAction(
//   '[Department] Fetch Departments Success',
//   props<{ departments: any[] }>()
// );

// export const fetchDepartmentsFailure = createAction(
//   '[Department] Fetch Departments Failure',
//   props<{ error: any }>()
// );

export const updateApplicantForm = createAction(
    '[Form] Update Applicant Form', props<{ payload: ApplicantForm }>()
);

export const updateCourseForm = createAction(
    '[Form] Update Course Form', props<{ payload: CourseForm }>()
);

export const updateGuardianForm = createAction(
    '[Form] Update Guardian Form', props<{ payload: GuardianForm }>()
);

export const updatePreviousEducationForm = createAction(
    '[Form] Update Previous Education Form', props<{ payload: PreviousEducationForm }>()
);
export const updateImageUpload = createAction(
    '[Form] Update Image Upload', props<{ payload: File | null }>()
);