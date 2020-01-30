import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private TicketsUrl = 'http://localhost:3000/Tickets';
  private MatchUrl = 'http://localhost:3000/Matches';

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.TicketsUrl);
  }

  getTicketByName(payload: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.TicketsUrl}/${payload}`);
  }

  createTicket(payload: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.TicketsUrl, payload);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.patch<Ticket>(
      `${this.TicketsUrl}/${ticket.id}`,
      ticket
    );
  }

  deleteTicket(payload: number) {
    return this.http.delete(`${this.TicketsUrl}/${payload}`);
  }

  getMatches(): Observable<any> {
    return this.http.get<any>(this.MatchUrl);
  }
}
