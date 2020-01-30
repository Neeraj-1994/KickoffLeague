import * as ticketActions from './ticket.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Ticket } from '../ticket.model';
import * as fromRoot from '../../state/app-state';

export interface TicketState extends EntityState<Ticket> {
  selectedTicketId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  tickets: TicketState;
}

export const ticketAdapter: EntityAdapter<Ticket> = createEntityAdapter<
  Ticket
  >();

export const defaultTicket: TicketState = {
  ids: [],
  entities: {},
  selectedTicketId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = ticketAdapter.getInitialState(defaultTicket);

export function ticketReducer(
  state = initialState,
  action: ticketActions.Action
): TicketState {
  switch (action.type) {
    case ticketActions.TicketActionTypes.LOAD_TICKETS_SUCCESS: {
      return ticketAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case ticketActions.TicketActionTypes.LOAD_TICKETS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case ticketActions.TicketActionTypes.LOAD_TICKET_SUCCESS: {
      return ticketAdapter.addOne(action.payload, {
        ...state,
        selectedTicketId: action.payload.id
      });
    }
    case ticketActions.TicketActionTypes.LOAD_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ticketActions.TicketActionTypes.CREATE_TICKET_SUCCESS: {
      return ticketAdapter.addOne(action.payload, state);
    }
    case ticketActions.TicketActionTypes.CREATE_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ticketActions.TicketActionTypes.UPDATE_TICKET_SUCCESS: {
      return ticketAdapter.updateOne(action.payload, state);
    }
    case ticketActions.TicketActionTypes.UPDATE_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ticketActions.TicketActionTypes.DELETE_TICKET_SUCCESS: {
      return ticketAdapter.removeOne(action.payload, state);
    }
    case ticketActions.TicketActionTypes.DELETE_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getTicketFeatureState = createFeatureSelector<TicketState>(
  'tickets'
);

export const getTickets = createSelector(
  getTicketFeatureState,
  ticketAdapter.getSelectors().selectAll
);

export const getTicketsLoading = createSelector(
  getTicketFeatureState,
  (state: TicketState) => state.loading
);

export const getTicketsLoaded = createSelector(
  getTicketFeatureState,
  (state: TicketState) => state.loaded
);

export const getError = createSelector(
  getTicketFeatureState,
  (state: TicketState) => state.error
);

export const getCurrentTicketId = createSelector(
  getTicketFeatureState,
  (state: TicketState) => state.selectedTicketId
);
export const getCurrentTicket = createSelector(
  getTicketFeatureState,
  getCurrentTicketId,
  state => state.entities[state.selectedTicketId]
);
