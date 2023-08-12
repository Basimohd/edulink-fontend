import {  PreviousEducationForm } from "../../modules/user/components/admission/store/form.interface";

export class PreviousEducationGroup {
    data = {
        previousInstitute:'',
        courseStudied: '',
        passingYear: ''
    } as PreviousEducationForm['data']
    isValid = false;
  }
