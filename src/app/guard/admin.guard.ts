import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthService} from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private authService: AuthService) {}

  canActivate() {
    if (this.authService.admin()) {
      return true;
    } else {
      return false;
    }
  }
}
