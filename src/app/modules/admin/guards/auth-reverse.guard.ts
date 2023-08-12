
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      return true;
    } else {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
  }
}
