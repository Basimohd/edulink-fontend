import { GuardianForm } from "../../modules/user/components/admission/store/form.interface";

export class GuardianGroup {
    data = {
        guardianName: '',
        relation: '',
        occupation: '',
        guardianPhone: ''
    } as GuardianForm['data']
    isValid = false;
}
