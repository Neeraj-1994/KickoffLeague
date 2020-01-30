import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private UsersUrl = 'http://localhost:3000/Users';

  constructor(private http: HttpClient) { }

  getUserById(payload: number): Observable<User> {
    return this.http.get<User>(`${this.UsersUrl}/${payload}`);
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(this.UsersUrl, payload);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${this.UsersUrl}/${user.id}`,
      user
    );
  }

  deleteUser(payload: number) {
    return this.http.delete(`${this.UsersUrl}/${payload}`);
  }
}
