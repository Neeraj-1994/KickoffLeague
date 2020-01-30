import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Bet } from './bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private BetsUrl = 'http://localhost:3000/Bets';
  private MatchUrl = 'http://localhost:3000/Matches';

  constructor(private http: HttpClient) { }

  getBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.BetsUrl);
  }

  getBetById(payload: number): Observable<Bet> {
    return this.http.get<Bet>(`${this.BetsUrl}/${payload}`);
  }

  createBet(payload: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.BetsUrl, payload);
  }

  updateBet(bet: Bet): Observable<Bet> {
    return this.http.patch<Bet>(
      `${this.BetsUrl}/${bet.Name}`,
      bet
    );
  }

  deleteBet(payload: number) {
    return this.http.delete(`${this.BetsUrl}/${payload}`);
  }

  getMatches(): Observable<any> {
    return this.http.get<any>(this.MatchUrl);
  }
}
