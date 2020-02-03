import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { Ticket} from '../ticket.model';

export enum TicketActionTypes {
  LOAD_TICKETS = '[Ticket] Load Tickets',
  LOAD_TICKETS_SUCCESS = '[Ticket] Load Tickets Success',
  LOAD_TICKETS_FAIL = '[Ticket] Load Tickets Fail',
  LOAD_TICKET = '[Ticket] Load Ticket',
  LOAD_TICKET_SUCCESS = '[Ticket] Load Ticket Success',
  LOAD_TICKET_FAIL = '[Ticket] Load Ticket Fail',
  CREATE_TICKET = '[Ticket] Create Ticket',
  CREATE_TICKET_SUCCESS = '[Ticket] Create Ticket Success',
  CREATE_TICKET_FAIL = '[Ticket] Create Ticket Fail',
  UPDATE_TICKET = '[Ticket] Update Ticket',
  UPDATE_TICKET_SUCCESS = '[Ticket] Update Ticket Success',
  UPDATE_TICKET_FAIL = '[Ticket] Update Ticket Fail',
  DELETE_TICKET = '[Ticket] Delete Ticket',
  DELETE_TICKET_SUCCESS = '[Ticket] Delete Ticket Success',
  DELETE_TICKET_FAIL = '[Ticket] Delete Ticket Fail'
}

export class LoadTickets implements Action {
  readonly type = TicketActionTypes.LOAD_TICKETS;
}

export class LoadTicketsSuccess implements Action {
  readonly type = TicketActionTypes.LOAD_TICKETS_SUCCESS;

  constructor(public payload: Ticket[]) {}
}

export class LoadTicketsFail implements Action {
  readonly type = TicketActionTypes.LOAD_TICKETS_FAIL;

  constructor(public payload: string) {}
}

export class LoadTicket implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET;

  constructor(public payload: string) {}
}

export class LoadTicketSuccess implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET_SUCCESS;

  constructor(public payload: Ticket) {}
}

export class LoadTicketFail implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET_FAIL;

  constructor(public payload: string) {}
}

export class CreateTicket implements Action {
  readonly type = TicketActionTypes.CREATE_TICKET;

  constructor(public payload: Ticket) {}
}

export class CreateTicketSuccess implements Action {
  readonly type = TicketActionTypes.CREATE_TICKET_SUCCESS;

  constructor(public payload: Ticket) {}
}

export class CreateTicketFail implements Action {
  readonly type = TicketActionTypes.CREATE_TICKET_FAIL;

  constructor(public payload: string) {}
}

export class UpdateTicket implements Action {
  readonly type = TicketActionTypes.UPDATE_TICKET;

  constructor(public payload: Ticket) {}
}

export class UpdateTicketSuccess implements Action {
  readonly type = TicketActionTypes.UPDATE_TICKET_SUCCESS;

  constructor(public payload: Update<Ticket>) {}
}

export class UpdateTicketFail implements Action {
  readonly type = TicketActionTypes.UPDATE_TICKET_FAIL;

  constructor(public payload: string) {}
}

export class DeleteTicket implements Action {
  readonly type = TicketActionTypes.DELETE_TICKET;

  constructor(public payload: number) {}
}

export class DeleteTicketSuccess implements Action {
  readonly type = TicketActionTypes.DELETE_TICKET_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteTicketFail implements Action {
  readonly type = TicketActionTypes.DELETE_TICKET_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadTickets
  | LoadTicketsSuccess
  | LoadTicketsFail
  | LoadTicket
  | LoadTicketSuccess
  | LoadTicketFail
  | CreateTicket
  | CreateTicketSuccess
  | CreateTicketFail
  | UpdateTicket
  | UpdateTicketSuccess
  | UpdateTicketFail
  | DeleteTicket
  | DeleteTicketSuccess
  | DeleteTicketFail;
