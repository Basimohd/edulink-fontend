import { ChangeDetectorRef, Component, ElementRef, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AdmissionService } from '../../services/admission.service';
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { admissionStatus } from './admission.enum';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { TitleCasePipe } from '@angular/common';
import { AdmissionApprovalComponent } from './admission-approval/admission-approval.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { DepartmentService } from '../../services/department.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
  providers: [TitleCasePipe]
})
export class AdmissionComponent {

  breadcrumbName: string = "Admission"
  admData!: any[]
  faeye = faEye;
  AdmissionStatus = admissionStatus;
  dataSource: any;
  displayedColumns: string[] = ["student", "guardian", "contact", "admissionDate", "action"];
  searchText: string = ''
  selectedDepartmentId: string = '';
  departments: any[] = [];
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: AdmissionService,
    private _departmentService: DepartmentService,
    public datepipe: DatePipe,
    public dialog: MatDialog,) { }


  ngOnInit() {
    this.loadAdmissions();
    this.getDepartments();
  }

  getDepartments() {
    this._departmentService.fetchDepartment().subscribe((res: any) => {
      this.departments = res.departments;
    });
  }

  getDataLength(){
    return this.dataSource.filteredData.length
  }
  loadAdmissions() {
    this.service.fetchAdmissionEnquiries().subscribe((res) => {
      this.admData = res
      this.dataSource = new MatTableDataSource(this.admData);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.FilterPredicate();
      this.dataAvailable = this.admData.length > 0;
    });
  }

  onDepartmentFilterChange(event: any) {
    this.selectedDepartmentId = event.value.trim().toLowerCase()
    this.applyFilter()
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.searchText = value.trim().toLowerCase()
    this.applyFilter()
  }

  applyFilter() {
    this.dataSource.paginator = this.paginatior;
    const searchText = this.searchText
    const selectedDepartment = this.selectedDepartmentId
    const filterValue = searchText + '$' + selectedDepartment
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataAvailable = this.dataSource.filteredData.length > 0;
  }

  FilterPredicate() {
    return (row: any, filters: string) => {
      const filterArray = filters.split('$');
      const searchText = filterArray[0];
      const selectedDepartment = filterArray[1];

      const matchFilter = [];
      const columnStudent = `${row.firstName} ${row.lastName}`;
      const columnDepartment = row.department._id;

      const customFilterStudent = columnStudent.toLowerCase().includes(searchText);
      const customFilterDepartment = columnDepartment.toLowerCase().includes(selectedDepartment);

      matchFilter.push(customFilterStudent);
      matchFilter.push(customFilterDepartment);

      return matchFilter.every(Boolean);
    };
  }
  
  exportToPDF() {
    let prepare:any[]=[];
    this.dataSource.filteredData.forEach((e:any)=>{
      var tempObj =[];
      tempObj.push(`${e.firstName} ${e.lastName}`);
      tempObj.push(e.department.departmentName);
      tempObj.push(e.guardianName);
      tempObj.push(e.studentPhone);
      tempObj.push(e.guardianPhone);
      tempObj.push(this.datepipe.transform(e.admissionDate, 'yyyy-MM-dd'));
      prepare.push(tempObj);
    });
    
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { fontSize: 9 },
      head: [['Name', 'Department','Guardian','Student No.','Guardian No.','Admission Date']],
      body: prepare
    })
    doc.save('admissionEnquiries.pdf')
  }

  statusChange(status: admissionStatus, department: string, id: string): void {

    if (status == admissionStatus.APPROVED) {
      const dialogRef = this.dialog.open(AdmissionApprovalComponent, {
        width: '552px',
        data: { status: status, department: department }
      });

      dialogRef.afterClosed().subscribe((approvalForm: FormGroup) => {
        if (approvalForm.value) {
          this.service.updateAdmissionStatus(id, status, approvalForm.value).subscribe((res) => {
            Swal.fire({
              title: `<span style="font-size: 24px">Admission ${status}!</span>`,
              icon: 'success'
            })
          })
        }
        this.loadAdmissions()
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.updateAdmissionStatus(id, status).subscribe((res) => {
            Swal.fire(
              'Rejected!',
              'The Admission has been Rejected.',
              'success'
            )
          })
          this.loadAdmissions()
        }
      })
    }
  }

  studentDetail(admissionDetails: any) {
    const dialogRef = this.dialog.open(StudentDetailsComponent, {
      width: '720px',
      maxHeight: '570px',
      panelClass: "custom",
      data: { admissionDetails: admissionDetails }
    });

    dialogRef.afterClosed().subscribe((approvalForm: FormGroup) => {

    });
  }

}


