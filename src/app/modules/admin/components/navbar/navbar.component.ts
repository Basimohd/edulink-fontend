import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() breadcrumb!:string;

  constructor(
    private _router: Router,
  ) { }

  onLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    this._router.navigate(['/admin/login'])
  }
}
