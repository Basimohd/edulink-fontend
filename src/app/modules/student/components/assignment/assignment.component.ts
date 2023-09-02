import { Component, ViewChild } from '@angular/core';
import { AssignmentService } from '../../service/assignment.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
  assignments!: MatTableDataSource<any>;
  displayedColumns: string[] = ['number', 'title', 'facultyName', 'dueDate', 'status', 'action'];
  faeye = faEye;
  searchText: string = '';
  fileUrls: string[] = [];
  fileNames: string[] = [];
  dataAvailable: boolean = true;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;


  constructor(
    private _assignmentService: AssignmentService,
    public dialog: MatDialog,
    private _storage: AngularFireStorage
  ) { }

  ngOnInit() {

    this.loadAssignmentDetails()
  }

  loadAssignmentDetails() {
    const studentId = localStorage.getItem('userId')
    this._assignmentService.fetchAssignmentsByDepartment(studentId).subscribe((res: any) => {
      console.log(res);
      
      this.assignments = new MatTableDataSource<any>(res);
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
  
  async onDetails(assignment: any) {
    const studentId = localStorage.getItem('userId')
    await assignment.submissions.forEach((submission: any) => {
      if (submission.studentId == studentId) {
        this.fileUrls = submission.fileUrl;
        this.getFileNames();
      }
    })

    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      width: '600px',
      maxHeight: '570px',
      panelClass: "custom",
      data: { 
        assignmentDetails: assignment,
        fileUrls:this.fileUrls,
        fileNames:this.fileNames 
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadAssignmentDetails()
    });

  }

  async getFileNames() {
    for (const url of this.fileUrls) {
      const name = await this.getFileName(url);
      this.fileNames.push(name);
    }
  }

  async getFileName(url: string): Promise<string> {
    const storageRef = this._storage.refFromURL(url);

    try {
      const metadata = await storageRef.getMetadata().toPromise();
      return metadata.name;
    } catch (error) {
      console.error('Error getting metadata:', error);
      return 'Unknown Filename';
    }
  }
}
