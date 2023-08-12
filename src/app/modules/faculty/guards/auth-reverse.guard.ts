import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardReverese implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('facultyToken');

    if (token) {
      this.router.navigate(['faculty']);
      return false;
    } else {
      return true;
    }
  }
}
