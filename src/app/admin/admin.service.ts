import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Team } from './admin.model';
import {Home} from '../home/home.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private TeamsUrl = 'http://localhost:3000/Team';
  private RefereeUrl = 'http://localhost:3000/Referee';
  private LinesmanUrl = 'http://localhost:3000/Linesman';
  private MatchUrl = 'http://localhost:3000/Matches';
  private StadiumUrl = 'http://localhost:3000/Stadium';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.TeamsUrl);
  }

  getTeamById(payload: number): Observable<Team> {
    return this.http.get<Team>(`${this.TeamsUrl}/${payload}`);
  }

  createTeam(payload: Team): Observable<Team> {
    return this.http.post<Team>(this.TeamsUrl, payload);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.patch<Team>(
      `${this.TeamsUrl}/${team.id}`,
      team
    );
  }

  deleteTeam(payload: number) {
    return this.http.delete(`${this.TeamsUrl}/${payload}`);
  }

  getOfficials(): Observable<any> {
    return this.http.get<any>(this.RefereeUrl);
  }
  getLinesman(): Observable<any> {
    return this.http.get<any>(this.LinesmanUrl);
  }
  getStadium(): Observable<any> {
    return this.http.get<any>(this.StadiumUrl);
  }
   sendMatch(Data): Observable<Home> {
    return this.http.post<Home>(this.MatchUrl, Data);
   }
}
