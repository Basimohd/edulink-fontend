import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FormState } from "./form.interface";

export const getFormState = createFeatureSelector<FormState>('form');

export const getAdmissionForm = createSelector(
    getFormState,
    (state) => state
);

export const getApplicantForm = createSelector(
    getFormState,
    (state) => state.applicantForm
);

export const getCourseForm = createSelector(
    getFormState,
    (state) => state.courseForm
);

export const getGuardianForm = createSelector(
    getFormState,
    (state) => state.guardianForm
);

export const getPreviousEducationForm = createSelector(
    getFormState,
    (state) => state.previouseducationForm
);

export const getImageFile = createSelector(
    getFormState,
    (state) => state.imageFile
);