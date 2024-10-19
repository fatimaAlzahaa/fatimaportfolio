  import { Injectable } from '@angular/core';
  import { CanActivate, Router } from '@angular/router';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
      const token = localStorage.getItem('accesstoken');

      // Check if token exists
      if (token) {
        // Optionally: Validate token expiration here
        return true;
      }

      // If no token, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
