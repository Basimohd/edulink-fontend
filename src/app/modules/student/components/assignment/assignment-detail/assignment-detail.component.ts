import { Component, Inject, ViewChild, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilePond, FilePondErrorDescription, FilePondFile, FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond';
import { AssignmentService } from '../../../service/assignment.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
  assignmentDetails!: any;
  pondFiles: any[] = [];
  fileIdToUrl: { [key: number]: string } = {};
  submissions!:any;
  fileUrls: string[] = [];
  fileNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AssignmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _assignmentService: AssignmentService,
    private _storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.assignmentDetails = this.data.assignmentDetails
    this.loadFiles()    
    this.fileUrls = this.submissions.fileUrl;
    this.getFileNames();
  }

  loadFiles(){
    const studentId = localStorage.getItem('userId')
    this.assignmentDetails.submissions.forEach((submission:any)=>{
      if(submission.studentId == studentId){
        this.submissions = submission
        this.pondFiles = submission.fileUrl.map((url:string)=>({
          source:url,
          options:{type:'local',size:500}
        }))
      }
    })
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
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    maxFileSize: '5MB',
    acceptedFileTypes: ['application/pdf'],
    maxFiles: 2,
    onremovefile: this.handleFileRemove.bind(this),
    server: {
      process: async (fieldName, file, metadata, load, error, progress, abort) => {
        const formData = new FormData();
        formData.append('file', file);
        const path = `assignments/${file.name}`;
        const uploadTask = await this._storage.upload(path, file)
        await uploadTask.ref.getDownloadURL().then((res) => {
          const userId = localStorage.getItem('userId')
          const data = {
            fileUrl: res,
            studentId: userId,
            assignmentId: this.assignmentDetails._id
          }
          this._assignmentService.uploadAssignmentFile(data).subscribe((response) => {
            if (response) {
              this.fileIdToUrl[file.lastModified] = res;
              load(res);
            }
          })
        })
      },
    },
  };

  async handleFileRemove(error: FilePondErrorDescription | null,file: any) {
    let url = this.fileIdToUrl[file.source.lastModified];
    if(!url){
      url = file.source
    }
    const userId = localStorage.getItem('userId')
      const data = {
        fileUrl: url,
        studentId: userId,
        assignmentId: this.assignmentDetails._id
      }
      console.log(data);
      
      this._assignmentService.deleteFile(data).subscribe((data)=>{
        console.log(data);
        
      })
      const storageRef = this._storage.refFromURL(url);
      await storageRef.delete();
      delete this.fileIdToUrl[file.source.lastModified]
    this.pondFiles = this.pondFiles.filter((pondFile) => pondFile.source !== file.source);
  }
}
