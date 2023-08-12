import { AbstractControl, FormArray } from "@angular/forms";

export function professorsValidator(control: AbstractControl): { [key: string]: any } | null {
    const professorsArray = control as FormArray;
    const minProfessors = 1; 
    return professorsArray.length >= minProfessors ? null : { professorsRequired: true };
  }