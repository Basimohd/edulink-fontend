import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service';
import { DepartmentService } from '../../../services/department.service';
import { faTrash,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { feesValidator } from '../../../../../common/validators/fee.validator';
import { professorsValidator } from '../../../../../common/validators/professors.validator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  faSpinner = faSpinner;
  faTrash = faTrash;
  isLoading:boolean = false;
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
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
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
        fees: this.fb.array([], [Validators.required,feesValidator])
      }),
      step3: this.fb.group({
        professors: this.fb.array([], [Validators.required, professorsValidator])
      })
    })



    this.getFaculties()
  }

  addProfessor(event: Event | null) {
    if (event instanceof Event) {
      const selectedProfessorId = event.target as HTMLInputElement;
      if (selectedProfessorId.value) {
        const professorId = selectedProfessorId.value;
        const isProfessorAlreadyAdded = this.professorsFormArray.value.includes(professorId);
        const isHodSelected = this.departmentForm.get('step1.HOD')?.value === professorId;
        if (!isProfessorAlreadyAdded && !isHodSelected) {
          this.professorsFormArray.push(new FormControl(professorId));
        }
      }
    }
  } 

  isProfessorAlreadyAdded(professorId: string): boolean {
    return this.professorsFormArray.value.includes(professorId);
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
      this.selectedDuration = this.departmentForm.get('step1.duration')?.value
      this.updateFeesArray();
      console.log(this.departmentForm.value)
      this.stepTwo = true;
      const stepTwoValid = this.departmentForm.get('step2')?.valid;
      if (!stepTwoValid) { return }
      this.step++;
    }
    this.selectedDuration = this.departmentForm.get('step1.duration')?.value
    this.updateFeesArray();
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
    if(this.step==3 ){
      this.stepThree = true;
      const stepTwoValid = this.departmentForm.get('step2')?.valid;
      if (!stepTwoValid) { return }
      if(this.departmentForm.valid){
        const depart = this.departmentForm.value
        const departmentDetails = {
          departmentName: depart.step1.departmentName,
          description: depart.step1.description,
          HOD: depart.step1.HOD,
          duration: depart.step1.duration,
          fees: depart.step2.fees,
          professors: depart.step3.professors,
        }
        this.isLoading = true
        this.departmentService.createDepartment(departmentDetails).subscribe((res)=>{
          if(res){
            this.dialogRef.close()
            this._snackBar.open("Department Added!", 'Close', {
              duration: 2000,
            });
          }
        },(err)=>{
          this.isLoading = false
          let errMsg!: string;
          if (err.status === 409) {
            errMsg = err.error.error;
          } else {
            errMsg = 'An error occurred. Please try again later'
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'error',
            title: errMsg
          })
        })
      }
    }
  }

}
