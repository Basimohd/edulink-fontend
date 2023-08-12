import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'
import { CurrencyPipe } from '@angular/common'
import { EditDepartmentComponent } from './edit-department/edit-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  breadcrumbName = "Department";
  departmentData !: any[];
  dataSource: any;
  displayedColumns: string[] = ["department", "hod", "courseYear", "totalFees", "action"];
  searchText: string = '';
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: DepartmentService,
    public datepipe: DatePipe,
    public currencypipe: CurrencyPipe,
  ) { }

  ngOnInit() {
    this.loadDepartment()
  }

  loadDepartment() {
    this.service.fetchDepartment().subscribe((res: any) => {
      let data = res.departments;
      data.forEach((obj: any) => {
        obj.totalFees = this.calculateTotalFees(obj);
      });
      this.departmentData = data;
      this.dataSource = new MatTableDataSource(this.departmentData);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.dataAvailable = this.departmentData.length > 0;
      this.dataSource.filterPredicate = this.FilterPredicate();
    })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.searchText = value.trim().toLowerCase()
    this.applyFilter()
  }

  applyFilter() {
    this.dataSource.paginator = this.paginatior;
    const searchText = this.searchText
    const filterValue = searchText
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataAvailable = this.dataSource.filteredData.length > 0;
  }

  FilterPredicate() {
    return (row: any, filters: string) => {
      const searchText = filters;

      const columnStudent = row.departmentName;

      const customFilterStudent = columnStudent.toLowerCase().includes(searchText);

      return customFilterStudent;
    };
  }

  exportToPDF() {
    let prepare:any[]=[];
    this.dataSource.filteredData.forEach((e:any)=>{
      var tempObj =[];
      tempObj.push(e.departmentName);
      tempObj.push(e.HOD.facultyName);
      tempObj.push(`${e.duration} Year`);
      tempObj.push(this.currencypipe.transform(e.totalFees,'INR'));
      prepare.push(tempObj);
    });
    
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { fontSize: 9 },
      head: [['Department Name', 'HOD','Course Year','Total Fees']],
      body: prepare
    })
    doc.save('departments.pdf')
  }


  calculateTotalFees(obj: any) {
    let totalFees = 0;
    obj.fees.forEach((fee: any) => {
      totalFees += parseInt(fee.tutionFees) + parseInt(fee.hostelFees) + parseInt(fee.examFees);
    });
    return totalFees;
  }

  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '672px',
      height: '480px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadDepartment()
    });
  }

  editDepartment(departmentData:any){
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '672px',
      data: { departmentData:departmentData }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadDepartment()
    });
  }
}
