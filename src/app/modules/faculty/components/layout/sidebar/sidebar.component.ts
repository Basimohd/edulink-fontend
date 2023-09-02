import { Component, ElementRef, HostListener } from '@angular/core';
import { facultyService } from '../../../services/faculty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  facultyData!: any;
  showDropdown: boolean = false
  constructor(
    private _facultyService: facultyService,
    private _router: Router,
    private _elementRef: ElementRef
  ) { }

  ngOnInit() {
    const facultyId = localStorage.getItem('facultyId')
    this._facultyService.getFacultyData(facultyId).subscribe((res) => {
      this.facultyData = res
    })
  }
  onProfile() {
    this.showDropdown = !this.showDropdown
  }

  onLogout() {
    localStorage.removeItem(`facultyToken`);
    localStorage.removeItem(`facultyId`);
    this._router.navigate(['/faculty/login']);
  }
}
