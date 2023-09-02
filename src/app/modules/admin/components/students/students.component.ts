import { Component, ViewChild } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { admissionStatus } from '../admission/admission.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../../services/student.service';
import { DepartmentService } from '../../services/department.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StudentDetailComponent } from './student-details/student-details.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  breadcrumbName: string = "Students"
  students!: any[]
  faeye = faEye;
  AdmissionStatus = admissionStatus;
  dataSource: any;
  displayedColumns: string[] = ["student","department", "guardian", "contact", "admissionDate", "action"];
  searchText: string = ''
  selectedDepartmentId: string = '';
  departments: any[] = [];
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: StudentService,
    private _departmentService: DepartmentService,
    public datepipe: DatePipe,
    public dialog: MatDialog
    ) { }


  ngOnInit() {
    this.loadStudents();
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
  
  loadStudents() {
    this.service.fetchStudents().subscribe((res:any) => {
      this.students = res.students
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.FilterPredicate();
      this.dataAvailable = this.students.length > 0;
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
    const filterValue = `${searchText}$${selectedDepartment}`
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataAvailable = this.dataSource.filteredData.length > 0;
  }

  FilterPredicate() {
    return (row: any, filters: string) => {
      const filterArray = filters.split('$');
      const searchText = filterArray[0];
      const selectedDepartment = filterArray[1];

      const matchFilter = [];
      const columnStudent = `${row.admssionDetails.firstName} ${row.admssionDetails.lastName}`;
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



  studentDetail(admissionDetails: any) {
    const dialogRef = this.dialog.open(StudentDetailComponent, {
      width: '720px',
      maxHeight: '570px',
      panelClass: "custom",
      data: { admissionDetails: admissionDetails }
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

}
