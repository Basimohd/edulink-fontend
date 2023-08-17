import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { FormGroup } from '@angular/forms';
import { BatchService } from '../../services/batches.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DepartmentService } from '../../services/department.service';
import { EditBatchComponent } from './edit-batch/edit-batch.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent {
  breadcrumbName = "Batches"
  batches: any[] = [];
  dataSource: any;
  displayedColumns: string[] = ["department", "batch", "tutor", "maxSeats", "action"];
  searchText: string = ''
  selectedDepartmentId: string = '';
  departments: any[] = [];
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private _batchService: BatchService,
    private _departmentService: DepartmentService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loadBatches()
    this.getDepartments()
  }

  loadBatches() {
    this._batchService.fetchDepartment().subscribe((res: any) => {
      this.batches = res.batches
      this.dataSource = new MatTableDataSource(this.batches);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.FilterPredicate();
      this.dataAvailable = this.batches.length > 0;
    })
  }

  getDepartments() {
    this._departmentService.fetchDepartment().subscribe((res: any) => {
      this.departments = res.departments;
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
      const columnBatch = `${row.batch.startYear}-${row.batch.endYear}`;
      const columnDepartment = row.department._id;

      const customFilterbatch = columnBatch.toLowerCase().includes(searchText);
      const customFilterDepartment = columnDepartment.toLowerCase().includes(selectedDepartment);

      matchFilter.push(customFilterbatch);
      matchFilter.push(customFilterDepartment);

      return matchFilter.every(Boolean);
    };
  }
  
  exportToPDF() {
    let prepare:any[]=[];
    this.dataSource.filteredData.forEach((e:any)=>{
      var tempObj =[];
      tempObj.push(e.department.departmentName);
      tempObj.push(`${e.batch.startYear} - ${e.batch.endYear}`);
      tempObj.push(e.tutor.facultyName);
      tempObj.push(e.maxSeats);
      prepare.push(tempObj);
    });
    
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { fontSize: 9 },
      head: [['Department', 'Batch','Tutor','Max Seats']],
      body: prepare
    })
    doc.save('batches.pdf')
  }

  addBatch() {
    const dialogRef = this.dialog.open(AddBatchComponent, {
      width: '672px',
      height: '394px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((departmentForm: FormGroup) => {
      this.loadBatches()
      
    });
  }
  editBatch(batch:any) {
    const dialogRef = this.dialog.open(EditBatchComponent, {
      width: '672px',
      height: '394px',
      data: {batch:batch}
    });

    dialogRef.afterClosed().subscribe((departmentForm: FormGroup) => {
      this.loadBatches()
      
    });
  }

}
