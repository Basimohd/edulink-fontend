import { CourseForm } from "../../modules/user/components/admission/store/form.interface";

export class CourseGroup {
    data = {
        department: null,
        quota: null,
        admissionType: null
    } as CourseForm['data']
    isValid = false;
}
