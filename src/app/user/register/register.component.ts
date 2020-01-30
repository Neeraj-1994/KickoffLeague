import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import {faUser, faWindowClose} from '@fortawesome/free-solid-svg-icons';

import {forbiddenNameValidator} from '../../_validators/username.validator';
import {PasswordValidator} from '../../_validators/password.validator';

import {User} from './register.model';

import * as fromUser from '../state/register.reducer';
import * as userActions from '../state/register.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userIcon = faUser;
  closeIcon = faWindowClose;

  // Form Component Shortening
  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get gender() {
    return this.registrationForm.get('gender');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  constructor(private fb: FormBuilder, private store: Store<fromUser.AppState>) { }

  registrationForm: FormGroup;

  submitted = false;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(4), forbiddenNameValidator(/admin/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9_@#$!]*$')]],
      confirmPassword: ['', Validators.required]
    }, {validator: PasswordValidator});

  }

  createUser() {
    const newUser: User = {
      id: this.registrationForm.get('id').value,
      firstName: this.registrationForm.get('firstName').value,
      lastName: this.registrationForm.get('lastName').value,
      userName: this.registrationForm.get('userName').value,
      email: this.registrationForm.get('email').value,
      gender: this.registrationForm.get('gender').value,
      password: this.registrationForm.get('password').value,
      confirmPassword: this.registrationForm.get('confirmPassword').value
    };

    this.store.dispatch(new userActions.CreateUser(newUser));
    this.submitted = true;

    this.registrationForm.reset();
  }

}
