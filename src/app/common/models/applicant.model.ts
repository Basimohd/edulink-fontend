import { ApplicantForm } from "../../modules/user/components/admission/store/form.interface";

export class ApplicantGroup {
    data = {
        firstName:'',
        lastName: '',
        studentEmail: '',
        dob: null,
        gender: '',
        studentPhone: '',
        address: '',
    } as ApplicantForm['data']
    isValid = false;
  }
