import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faLock, faSignInAlt} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userIcon = faUser;
  passIcon = faLock;
  loginIcon = faSignInAlt;

  loginForm: FormGroup;

  // Form Component Shortening

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, private loginUsers: AuthService, private loginRouter: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.loginUsers.loginUser(this.loginForm.value)
      .subscribe(
        response => {
          console.log('Success!', response);
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.loginRouter.navigate(['/ticket']);
        }
        ,
        error => console.error('Error!', error)
      );
  }
}
