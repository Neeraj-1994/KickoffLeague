import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { Team } from '../admin.model';

export enum TeamActionTypes {
  LOAD_TEAMS = '[Team] Load Teams',
  LOAD_TEAMS_SUCCESS = '[Team] Load Teams Success',
  LOAD_TEAMS_FAIL = '[Team] Load Teams Fail',
  LOAD_TEAM = '[Team] Load Team',
  LOAD_TEAM_SUCCESS = '[Team] Load Team Success',
  LOAD_TEAM_FAIL = '[Team] Load Team Fail',
  CREATE_TEAM = '[Team] Create Team',
  CREATE_TEAM_SUCCESS = '[Team] Create Team Success',
  CREATE_TEAM_FAIL = '[Team] Create Team Fail',
  UPDATE_TEAM = '[Team] Update Team',
  UPDATE_TEAM_SUCCESS = '[Team] Update Team Success',
  UPDATE_TEAM_FAIL = '[Team] Update Team Fail',
  DELETE_TEAM = '[Team] Delete Team',
  DELETE_TEAM_SUCCESS = '[Team] Delete Team Success',
  DELETE_TEAM_FAIL = '[Team] Delete Team Fail'
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LOAD_TEAMS;
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamActionTypes.LOAD_TEAMS_SUCCESS;

  constructor(public payload: Team[]) {}
}

export class LoadTeamsFail implements Action {
  readonly type = TeamActionTypes.LOAD_TEAMS_FAIL;

  constructor(public payload: string) {}
}

export class LoadTeam implements Action {
  readonly type = TeamActionTypes.LOAD_TEAM;

  constructor(public payload: number) {}
}

export class LoadTeamSuccess implements Action {
  readonly type = TeamActionTypes.LOAD_TEAM_SUCCESS;

  constructor(public payload: Team) {}
}

export class LoadTeamFail implements Action {
  readonly type = TeamActionTypes.LOAD_TEAM_FAIL;

  constructor(public payload: string) {}
}

export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM;

  constructor(public payload: Team) {}
}

export class CreateTeamSuccess implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM_SUCCESS;

  constructor(public payload: Team) {}
}

export class CreateTeamFail implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM_FAIL;

  constructor(public payload: string) {}
}

export class UpdateTeam implements Action {
  readonly type = TeamActionTypes.UPDATE_TEAM;

  constructor(public payload: Team) {}
}

export class UpdateTeamSuccess implements Action {
  readonly type = TeamActionTypes.UPDATE_TEAM_SUCCESS;

  constructor(public payload: Update<Team>) {}
}

export class UpdateTeamFail implements Action {
  readonly type = TeamActionTypes.UPDATE_TEAM_FAIL;

  constructor(public payload: string) {}
}

export class DeleteTeam implements Action {
  readonly type = TeamActionTypes.DELETE_TEAM;

  constructor(public payload: number) {}
}

export class DeleteTeamSuccess implements Action {
  readonly type = TeamActionTypes.DELETE_TEAM_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteTeamFail implements Action {
  readonly type = TeamActionTypes.DELETE_TEAM_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFail
  | LoadTeam
  | LoadTeamSuccess
  | LoadTeamFail
  | CreateTeam
  | CreateTeamSuccess
  | CreateTeamFail
  | UpdateTeam
  | UpdateTeamSuccess
  | UpdateTeamFail
  | DeleteTeam
  | DeleteTeamSuccess
  | DeleteTeamFail;
