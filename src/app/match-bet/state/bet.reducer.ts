import * as betActions from './bet.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Bet } from '../bet.model';
import * as fromRoot from '../../state/app-state';

export interface BetState extends EntityState<Bet> {
  selectedBetId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  bets: BetState;
}

export const betAdapter: EntityAdapter<Bet> = createEntityAdapter<
  Bet
  >();

export const defaultBet: BetState = {
  ids: [],
  entities: {},
  selectedBetId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = betAdapter.getInitialState(defaultBet);

export function betReducer(
  state = initialState,
  action: betActions.Action
): BetState {
  switch (action.type) {
    case betActions.BetActionTypes.LOAD_BETS_SUCCESS: {
      return betAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case betActions.BetActionTypes.LOAD_BETS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case betActions.BetActionTypes.LOAD_BET_SUCCESS: {
      return betAdapter.addOne(action.payload, {
        ...state,
        selectedBetId: action.payload.id
      });
    }
    case betActions.BetActionTypes.LOAD_BET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case betActions.BetActionTypes.CREATE_BET_SUCCESS: {
      return betAdapter.addOne(action.payload, state);
    }
    case betActions.BetActionTypes.CREATE_BET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case betActions.BetActionTypes.UPDATE_BET_SUCCESS: {
      return betAdapter.updateOne(action.payload, state);
    }
    case betActions.BetActionTypes.UPDATE_BET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case betActions.BetActionTypes.DELETE_BET_SUCCESS: {
      return betAdapter.removeOne(action.payload, state);
    }
    case betActions.BetActionTypes.DELETE_BET_FAIL: {
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

const getBetFeatureState = createFeatureSelector<BetState>(
  'bets'
);

export const getBets = createSelector(
  getBetFeatureState,
  betAdapter.getSelectors().selectAll
);

export const getBetsLoading = createSelector(
  getBetFeatureState,
  (state: BetState) => state.loading
);

export const getBetsLoaded = createSelector(
  getBetFeatureState,
  (state: BetState) => state.loaded
);

export const getError = createSelector(
  getBetFeatureState,
  (state: BetState) => state.error
);

export const getCurrentBetId = createSelector(
  getBetFeatureState,
  (state: BetState) => state.selectedBetId
);
export const getCurrentBet = createSelector(
  getBetFeatureState,
  getCurrentBetId,
  state => state.entities[state.selectedBetId]
);
