import * as teamActions from './admin.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Team } from '../admin.model';
import * as fromRoot from '../../state/app-state';

export interface TeamState extends EntityState<Team> {
  selectedTeamId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  teams: TeamState;
}

export const teamAdapter: EntityAdapter<Team> = createEntityAdapter<
  Team
  >();

export const defaultTeam: TeamState = {
  ids: [],
  entities: {},
  selectedTeamId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = teamAdapter.getInitialState(defaultTeam);

export function teamReducer(
  state = initialState,
  action: teamActions.Action
): TeamState {
  switch (action.type) {
    case teamActions.TeamActionTypes.LOAD_TEAMS_SUCCESS: {
      return teamAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case teamActions.TeamActionTypes.LOAD_TEAMS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case teamActions.TeamActionTypes.LOAD_TEAM_SUCCESS: {
      return teamAdapter.addOne(action.payload, {
        ...state,
        selectedTeamId: action.payload.id
      });
    }
    case teamActions.TeamActionTypes.LOAD_TEAM_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case teamActions.TeamActionTypes.CREATE_TEAM_SUCCESS: {
      return teamAdapter.addOne(action.payload, state);
    }
    case teamActions.TeamActionTypes.CREATE_TEAM_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case teamActions.TeamActionTypes.UPDATE_TEAM_SUCCESS: {
      return teamAdapter.updateOne(action.payload, state);
    }
    case teamActions.TeamActionTypes.UPDATE_TEAM_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case teamActions.TeamActionTypes.DELETE_TEAM_SUCCESS: {
      return teamAdapter.removeOne(action.payload, state);
    }
    case teamActions.TeamActionTypes.DELETE_TEAM_FAIL: {
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

const getTeamFeatureState = createFeatureSelector<TeamState>(
  'teams'
);

export const getTeams = createSelector(
  getTeamFeatureState,
  teamAdapter.getSelectors().selectAll
);

export const getTeamsLoading = createSelector(
  getTeamFeatureState,
  (state: TeamState) => state.loading
);

export const getTeamsLoaded = createSelector(
  getTeamFeatureState,
  (state: TeamState) => state.loaded
);

export const getError = createSelector(
  getTeamFeatureState,
  (state: TeamState) => state.error
);

export const getCurrentTeamId = createSelector(
  getTeamFeatureState,
  (state: TeamState) => state.selectedTeamId
);
export const getCurrentTeam = createSelector(
  getTeamFeatureState,
  getCurrentTeamId,
  state => state.entities[state.selectedTeamId]
);
