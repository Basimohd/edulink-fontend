import { createReducer, on } from "@ngrx/store";
import { ApplicantForm, CourseForm, FormState, GuardianForm, PreviousEducationForm } from "./form.interface";
import { updateApplicantForm, updateCourseForm, updateGuardianForm, updateImageUpload, updatePreviousEducationForm } from "./form.action";
import { ApplicantGroup } from "../../../../../common/models/applicant.model";
import { CourseGroup } from "../../../../../common/models/course.model";
import { GuardianGroup } from "../../../../../common/models/guardian.model";
import { PreviousEducationGroup } from "../../../../../common/models/previousEducation.model";

const initialApplicant:ApplicantForm = new ApplicantGroup()
const initialCourse:CourseForm = new CourseGroup()
const initialGuardian:GuardianForm = new GuardianGroup()
const initialPreviousEducation:PreviousEducationForm = new PreviousEducationGroup()

export const initialFormState: FormState = {
    applicantForm: initialApplicant,
    courseForm: initialCourse,
    guardianForm: initialGuardian,
    previouseducationForm: initialPreviousEducation,
    imageFile : null
};

export const formReducer = createReducer(
    initialFormState,
    on(updateApplicantForm, (state, { payload }) => ({ ...state, applicantForm: payload })),
    on(updateCourseForm, (state, { payload }) => ({ ...state, courseForm: payload })),
    on(updateGuardianForm, (state, { payload }) => ({ ...state, guardianForm: payload })),
    on(updatePreviousEducationForm, (state, { payload }) => ({ ...state, previouseducationForm: payload })),
    on(updateImageUpload, (state, { payload }) => ({ ...state, imageFile: payload }))
  );
  