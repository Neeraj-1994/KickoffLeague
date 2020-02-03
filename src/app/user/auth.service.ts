import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authHttp: HttpClient, private router: Router) { }

  private loginUrl = 'http://localhost:3000/auth/login'; // Server log in Service

  // Logs User in
  loginUser(userData): Observable<any> {
    return this.authHttp.post<any>(this.loginUrl, userData);
  }

  // Gets JWT token
  getToken() {
    return localStorage.getItem('token');
  }

  // verifies logged In Users
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // Gives access to admin
  admin() {
    return this.loggedIn() && JSON.parse(localStorage.getItem('user')).role === 'admin';
  }

  // Gives Username on screen
  showUser() {
    return JSON.parse(localStorage.getItem('user')).userName;
  }

  // Logs User Out
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/Home']);
  }
}
