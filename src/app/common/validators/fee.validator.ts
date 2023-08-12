import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function feesValidator(control: AbstractControl): { [key: string]: any } | null {
    const feesArray = control as FormArray;
    const invalidFee = feesArray.controls.find(feeGroup => {
        const fee = feeGroup as FormGroup;
        return fee.invalid;
      });
      
    return invalidFee ? { feesInvalid: true } : null;
}