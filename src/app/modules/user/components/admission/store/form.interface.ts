
export interface FormBase {
  isValid: boolean;
  // Add any other common properties if needed
}
export interface FormState {
  applicantForm: ApplicantForm;
  courseForm: CourseForm;
  guardianForm: GuardianForm;
  previouseducationForm: PreviousEducationForm;
  imageFile: File | null
}

export interface ApplicantForm extends FormBase {
  data: {
    firstName: string;
    lastName: string;
    studentEmail: string;
    dob: Date | null;
    gender: string | null
    studentPhone: string;
    address: string;
  }
}

export interface CourseForm extends FormBase{
  data: {
    department: string | null;
    quota: string | null;
    admissionType: string | null;
  }
}

export interface GuardianForm extends FormBase{
  data: {
    guardianName:string
    relation: string
    occupation: string
    guardianPhone: string
  }
}

export interface PreviousEducationForm extends FormBase {
  data: {
    previousInstitute: string
    courseStudied: string
    passingYear: string
  }
}

