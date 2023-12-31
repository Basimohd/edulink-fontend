import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssingmentService } from '../../services/assignment.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Assignment } from '../../interfaces/assignment.interface'

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
  assignments!: MatTableDataSource<Assignment>;
  displayedColumns: string[] = ['number', 'title', 'department', 'dueDate', 'status', 'action'];
  searchText: string = '';
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  dataAvailable: boolean = true;
  faeye = faEye;
  private readonly facultyId = localStorage.getItem('facultyId')

  constructor(
    private _assignmentService:AssingmentService,
    public dialog: MatDialog,
    private _router:Router
  ){}

  ngOnInit(){
    this.loadAssignments()
  }
  
  loadAssignments(){
    this._assignmentService.fetchAssignments(this.facultyId).subscribe((res:any)=>{
      this.assignments = new MatTableDataSource<Assignment>(res);
      this.assignments.paginator = this.paginatior;
      this.dataAvailable = res.length > 0;
      this.assignments.filterPredicate = this.FilterPredicate();
    })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.searchText = value.trim().toLowerCase()
    this.applyFilter()
  }

  applyFilter() {
    this.assignments.paginator = this.paginatior;
    const searchText = this.searchText
    const filterValue = searchText
    this.assignments.filter = filterValue.trim().toLowerCase();
    this.dataAvailable = this.assignments.filteredData.length > 0;
  }

  FilterPredicate() {
    return (row: any, filters: string) => {
      const searchText = filters;
      const columnStudent = row.title;
      const customFilterStudent = columnStudent.toLowerCase().includes(searchText);
      return customFilterStudent;
    };
  }

  onAdd(){
    const dialogRef = this.dialog.open(AddAssignmentComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.loadAssignments()
    })
  }
  
  onDetails(assignment:any){
    const navigationExtras:NavigationExtras = {
      state:assignment
    }
    this._router.navigate(['/faculty/assignment/details'],navigationExtras)
  }
}
