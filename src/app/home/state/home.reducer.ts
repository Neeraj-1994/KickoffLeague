import * as homeActions from './home.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Home } from '../home.model';
import * as fromRoot from '../../state/app-state';

export interface HomeState extends EntityState<Home> {
  selectedHomeId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  homes: HomeState;
}

export const homeAdapter: EntityAdapter<Home> = createEntityAdapter<
  Home
>();

export const defaultHome: HomeState = {
  ids: [],
  entities: {},
  selectedHomeId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = homeAdapter.getInitialState(defaultHome);

export function homeReducer(
  state = initialState,
  action: homeActions.Action
): HomeState {
  switch (action.type) {
    case homeActions.HomeActionTypes.LOAD_HOMES_SUCCESS: {
      return homeAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case homeActions.HomeActionTypes.LOAD_HOMES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case homeActions.HomeActionTypes.LOAD_HOME_SUCCESS: {
      return homeAdapter.addOne(action.payload, {
        ...state,
        selectedHomeId: action.payload.id
      });
    }
    case homeActions.HomeActionTypes.LOAD_HOME_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case homeActions.HomeActionTypes.CREATE_HOME_SUCCESS: {
      return homeAdapter.addOne(action.payload, state);
    }
    case homeActions.HomeActionTypes.CREATE_HOME_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case homeActions.HomeActionTypes.UPDATE_HOME_SUCCESS: {
      return homeAdapter.updateOne(action.payload, state);
    }
    case homeActions.HomeActionTypes.UPDATE_HOME_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case homeActions.HomeActionTypes.DELETE_HOME_SUCCESS: {
      return homeAdapter.removeOne(action.payload, state);
    }
    case homeActions.HomeActionTypes.DELETE_HOME_FAIL: {
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

const getHomeFeatureState = createFeatureSelector<HomeState>(
  'homes'
);

export const getHomes = createSelector(
  getHomeFeatureState,
  homeAdapter.getSelectors().selectAll
);

export const getHomesLoading = createSelector(
  getHomeFeatureState,
  (state: HomeState) => state.loading
);

export const getHomesLoaded = createSelector(
  getHomeFeatureState,
  (state: HomeState) => state.loaded
);

export const getError = createSelector(
  getHomeFeatureState,
  (state: HomeState) => state.error
);

export const getCurrentHomeId = createSelector(
  getHomeFeatureState,
  (state: HomeState) => state.selectedHomeId
);
export const getCurrentHome = createSelector(
  getHomeFeatureState,
  getCurrentHomeId,
  state => state.entities[state.selectedHomeId]
);
