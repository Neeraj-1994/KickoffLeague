import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Home } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private homesUrl = 'http://localhost:3000/Matches';

  constructor(private http: HttpClient) {}

  getHomes(): Observable<Home[]> {
    return this.http.get<Home[]>(this.homesUrl);
  }

  getHomeById(payload: number): Observable<Home> {
    return this.http.get<Home>(`${this.homesUrl}/${payload}`);
  }

  createHome(payload: Home): Observable<Home> {
    return this.http.post<Home>(this.homesUrl, payload);
  }

  updateHome(home: Home): Observable<Home> {
    return this.http.patch<Home>(
      `${this.homesUrl}/${home.id}`,
      home
    );
  }

  deleteHome(payload: number) {
    return this.http.delete(`${this.homesUrl}/${payload}`);
  }
}
