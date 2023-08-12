import { AbstractControl } from '@angular/forms';

export function ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value === null || control.value === '') {
    return null; // Don't perform validation if the field is empty.
  }

  const birthDate = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age <= 15) {
    return { 'invalidAge': true };
  }

  return null;
}