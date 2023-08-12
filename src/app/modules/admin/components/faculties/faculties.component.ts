import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { FormGroup } from '@angular/forms';
import { FacultyService } from '../../services/faculty.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit{
  breadcrumbName="Faculties"
  facultiesData !: any[];
  dataSource: any;
  displayedColumns: string[] = ["faculty", "contact", "subject", "joinedAt", "action"];
  searchText: string = '';
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private service: FacultyService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(){
    this.loadFaculties()
  }

  loadFaculties(){
    this.service.fetchFaculties().subscribe((res:any)=>{
      this.facultiesData = res.faculties;
      this.dataSource = new MatTableDataSource(this.facultiesData);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.dataAvailable = this.facultiesData.length > 0;
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
    console.log(this.dataSource.filter)
    this.dataAvailable = this.dataSource.filteredData.length > 0;
  }

  FilterPredicate() {
    return (row: any, filters: string) => {
      const searchText = filters;

      const columnStudent = row.facultyName;
      const columnFacultyId = row.facultyId;

      const customFilterStudent = columnStudent.toLowerCase().includes(searchText);
      const customFilterFacultyId = columnFacultyId.toLowerCase().includes(searchText);

      return customFilterStudent || customFilterFacultyId;
    };
  }

  exportToPDF() {
    let prepare:any[]=[];
    this.dataSource.filteredData.forEach((e:any)=>{
      var tempObj =[];
      tempObj.push(e.facultyId);
      tempObj.push(e.facultyName);
      tempObj.push(e.phoneNumber);
      tempObj.push(e.email);
      tempObj.push(e.mainSubject);
      tempObj.push(this.datepipe.transform(e.joinedAt, 'yyyy-MM-dd'));
      prepare.push(tempObj);
    });
    
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { fontSize: 9 },
      head: [['ID', 'Name','Number','Email','Subject','JoinedAt']],
      body: prepare
    })
    doc.save('faculties.pdf')
  }

  addFaculties(){
    const dialogRef = this.dialog.open(AddFacultyComponent, {
      width: '672px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe((classForm: FormGroup) => {
      this.loadFaculties()
    });
  }
  editFaculties(facultyData:any){
    const dialogRef = this.dialog.open(EditFacultyComponent, {
      width: '672px',
      data: { facultyData:facultyData }
    });

    dialogRef.afterClosed().subscribe((classForm: FormGroup) => {
      this.loadFaculties()
    });
  }
}
