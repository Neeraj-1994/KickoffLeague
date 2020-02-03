import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { TicketService} from '../ticket.service';
import * as ticketActions from './ticket.actions';
import { Ticket} from '../ticket.model';

@Injectable()
export class TicketEffect {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}

  @Effect()
  loadTickets$: Observable<Action> = this.actions$.pipe(
    ofType<ticketActions.LoadTickets>(
      ticketActions.TicketActionTypes.LOAD_TICKETS
    ),
    mergeMap((action: ticketActions.LoadTickets) =>
      this.ticketService.getTickets().pipe(
        map(
          (tickets: Ticket[]) =>
            new ticketActions.LoadTicketsSuccess(tickets)
        ),
        catchError(err => of(new ticketActions.LoadTicketsFail(err)))
      )
    )
  );

  @Effect()
  loadTicket$: Observable<Action> = this.actions$.pipe(
    ofType<ticketActions.LoadTicket>(
      ticketActions.TicketActionTypes.LOAD_TICKET
    ),
    mergeMap((action: ticketActions.LoadTicket) =>
      this.ticketService.getTicketByName(action.payload).pipe(
        map(
          (ticket: Ticket) =>
            new ticketActions.LoadTicketSuccess(ticket)
        ),
        catchError(err => of(new ticketActions.LoadTicketFail(err)))
      )
    )
  );

  @Effect()
  createTicket$: Observable<Action> = this.actions$.pipe(
    ofType<ticketActions.CreateTicket>(
      ticketActions.TicketActionTypes.CREATE_TICKET
    ),
    map((action: ticketActions.CreateTicket) => action.payload),
    mergeMap((ticket: Ticket) =>
      this.ticketService.createTicket(ticket).pipe(
        map(
          (newTicket: Ticket) =>
            new ticketActions.CreateTicketSuccess(newTicket)
        ),
        catchError(err => of(new ticketActions.CreateTicketFail(err)))
      )
    )
  );

  @Effect()
  updateTicket$: Observable<Action> = this.actions$.pipe(
    ofType<ticketActions.UpdateTicket>(
      ticketActions.TicketActionTypes.UPDATE_TICKET
    ),
    map((action: ticketActions.UpdateTicket) => action.payload),
    mergeMap((ticket: Ticket) =>
      this.ticketService.updateTicket(ticket).pipe(
        map(
          (updateTicket: Ticket) =>
            new ticketActions.UpdateTicketSuccess({
              id: updateTicket.id,
              changes: updateTicket
            })
        ),
        catchError(err => of(new ticketActions.UpdateTicketFail(err)))
      )
    )
  );

  @Effect()
  deleteTicket$: Observable<Action> = this.actions$.pipe(
    ofType<ticketActions.DeleteTicket>(
      ticketActions.TicketActionTypes.DELETE_TICKET
    ),
    map((action: ticketActions.DeleteTicket) => action.payload),
    mergeMap((id: number) =>
      this.ticketService.deleteTicket(id).pipe(
        map(() => new ticketActions.DeleteTicketSuccess(id)),
        catchError(err => of(new ticketActions.DeleteTicketFail(err)))
      )
    )
  );
}
