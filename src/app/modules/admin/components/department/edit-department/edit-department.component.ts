import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { DepartmentService } from '../../../services/department.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent {
  faTrash = faTrash;
  step: number = 1;
  departmentForm!: FormGroup;
  selectedDuration: number = 0;
  NonHodFacultyData !: any[]
  stepOne = false;
  stepTwo = false;
  stepThree = false;

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<EditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.departmentForm = this.fb.group({
      step1: this.fb.group({
        departmentName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        HOD: ['', [Validators.required]],
        duration: ['', [Validators.required]]
      }),
      step2: this.fb.group({
        fees: this.fb.array([])
      }),
      step3: this.fb.group({
        professors: this.fb.array([])
      })
    })

    this.departmentForm.get('step1.duration')?.valueChanges.subscribe((value) => {
      this.selectedDuration = value;
      this.updateFeesArray();
    });

    this.getFaculties()
    this.patchForm()
  }

  patchForm() {
    let Ddata = this.data.departmentData
    this.departmentForm.patchValue({
      step1: {
        departmentName: Ddata.departmentName,
        description: Ddata.description,
        HOD: Ddata.HOD._id,
        duration: Ddata.duration,
      }
    });
    const feesArray = this.departmentForm.get('step2.fees') as FormArray;
    feesArray.clear();

    Ddata.fees.forEach((fee: any) => {
      feesArray.push(this.fb.group({
        year: fee.year,
        tutionFees: fee.tutionFees,
        hostelFees: fee.hostelFees,
        examFees: fee.examFees
      }));
    })
    this.professorsFormArray.clear();
    Ddata.professors.forEach((professor: any) => {
      console.log(professor)
      this.professorsFormArray.push(new FormControl(professor._id));
    });
  }
  
  addProfessor(event: Event | null) {
    if (event instanceof Event) {
      const selectedProfessorId = event.target as HTMLInputElement;
      if (selectedProfessorId.value) {
        this.professorsFormArray.push(new FormControl(selectedProfessorId.value));
      }
    }
  }

  getProfessorNameById(professorId: string): string {
    const professor = this.NonHodFacultyData.find((faculty) => faculty._id === professorId);
    return professor ? professor.facultyName : '';
  }

  get professorsFormArray(): FormArray {
    return this.departmentForm.get('step3.professors') as FormArray;
  }

  removeProfessor(index: number): void {
    this.professorsFormArray.removeAt(index);
  }

  getFaculties(): void {
    this.facultyService.fetchFaculties().subscribe((res: any) => {
      this.NonHodFacultyData = res.faculties.filter((faculty: any) => faculty.isHOD == false)
    })
  }

  updateFeesArray() {
    const feesArray = (this.departmentForm.get('step2.fees') as FormArray)
    const currentLength = feesArray.length;

    if (this.selectedDuration > currentLength) {
      for (let i = currentLength; i < this.selectedDuration; i++) {
        feesArray.push(this.AddFees(i + 1));
      }
    } else if (this.selectedDuration < currentLength) {
      for (let i = currentLength; i > this.selectedDuration; i--) {
        feesArray.removeAt(i - 1);
      }
    }
  }

  getStepLoopArray(): number[] {
    return Array(this.selectedDuration).fill(0).map((_, index) => index + 1);
  }

  AddFees(year: number): FormGroup {
    return this.fb.group({
      year: [year, [Validators.required]],
      tutionFees: ['', [Validators.required]],
      hostelFees: ['', [Validators.required]],
      examFees: ['', [Validators.required]],
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.departmentForm.get(name);
  }

  get feesControls() {
    return (this.departmentForm.get('step2.fees') as FormArray).controls
  }

  next() {
    if (this.step == 1) {
      this.stepOne = true;
      const stepOneValid = this.departmentForm.get('step1')?.valid;
      if (!stepOneValid) { return }
      this.step++
    } else if (this.step == 2) {
      this.stepTwo = true;
      const stepTwoValid = this.departmentForm.get('step2')?.valid;
      if (!stepTwoValid) { return }
      this.step++;
    }
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.stepTwo = false;
    }
    if (this.step == 2) {
      this.stepThree = false;
    }
  }

  onSubmit() {
    if (this.step == 3) {
      this.stepThree = true;
      const stepTwoValid = this.departmentForm.get('step2')?.valid;
      if (!stepTwoValid) { return }
      const depart = this.departmentForm.value
      const departmentDetails = {
        departmentID:this.data.departmentData._id,
        departmentName: depart.step1.departmentName,
        description: depart.step1.description,
        HOD: depart.step1.HOD,
        duration: depart.step1.duration,
        fees: depart.step2.fees,
        professors: depart.step3.professors,
      }
      this.departmentService.updateDepartment(departmentDetails).subscribe((res) => {
        if(res){
          this.dialogRef.close()
        }
      })
    }
  }

}
