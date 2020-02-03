import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { Home } from '../home.model';

export enum HomeActionTypes {
  LOAD_HOMES = '[Home] Load Homes',
  LOAD_HOMES_SUCCESS = '[Home] Load Homes Success',
  LOAD_HOMES_FAIL = '[Home] Load Homes Fail',
  LOAD_HOME = '[Home] Load Home',
  LOAD_HOME_SUCCESS = '[Home] Load Home Success',
  LOAD_HOME_FAIL = '[Home] Load Home Fail',
  CREATE_HOME = '[Home] Create Home',
  CREATE_HOME_SUCCESS = '[Home] Create Home Success',
  CREATE_HOME_FAIL = '[Home] Create Home Fail',
  UPDATE_HOME = '[Home] Update Home',
  UPDATE_HOME_SUCCESS = '[Home] Update Home Success',
  UPDATE_HOME_FAIL = '[Home] Update Home Fail',
  DELETE_HOME = '[Home] Delete Home',
  DELETE_HOME_SUCCESS = '[Home] Delete Home Success',
  DELETE_HOME_FAIL = '[Home] Delete Home Fail'
}

export class LoadHomes implements Action {
  readonly type = HomeActionTypes.LOAD_HOMES;
}

export class LoadHomesSuccess implements Action {
  readonly type = HomeActionTypes.LOAD_HOMES_SUCCESS;

  constructor(public payload: Home[]) {}
}

export class LoadHomesFail implements Action {
  readonly type = HomeActionTypes.LOAD_HOMES_FAIL;

  constructor(public payload: string) {}
}

export class LoadHome implements Action {
  readonly type = HomeActionTypes.LOAD_HOME;

  constructor(public payload: number) {}
}

export class LoadHomeSuccess implements Action {
  readonly type = HomeActionTypes.LOAD_HOME_SUCCESS;

  constructor(public payload: Home) {}
}

export class LoadHomeFail implements Action {
  readonly type = HomeActionTypes.LOAD_HOME_FAIL;

  constructor(public payload: string) {}
}

export class CreateHome implements Action {
  readonly type = HomeActionTypes.CREATE_HOME;

  constructor(public payload: Home) {}
}

export class CreateHomeSuccess implements Action {
  readonly type = HomeActionTypes.CREATE_HOME_SUCCESS;

  constructor(public payload: Home) {}
}

export class CreateHomeFail implements Action {
  readonly type = HomeActionTypes.CREATE_HOME_FAIL;

  constructor(public payload: string) {}
}

export class UpdateHome implements Action {
  readonly type = HomeActionTypes.UPDATE_HOME;

  constructor(public payload: Home) {}
}

export class UpdateHomeSuccess implements Action {
  readonly type = HomeActionTypes.UPDATE_HOME_SUCCESS;

  constructor(public payload: Update<Home>) {}
}

export class UpdateHomeFail implements Action {
  readonly type = HomeActionTypes.UPDATE_HOME_FAIL;

  constructor(public payload: string) {}
}

export class DeleteHome implements Action {
  readonly type = HomeActionTypes.DELETE_HOME;

  constructor(public payload: number) {}
}

export class DeleteHomeSuccess implements Action {
  readonly type = HomeActionTypes.DELETE_HOME_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteHomeFail implements Action {
  readonly type = HomeActionTypes.DELETE_HOME_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadHomes
  | LoadHomesSuccess
  | LoadHomesFail
  | LoadHome
  | LoadHomeSuccess
  | LoadHomeFail
  | CreateHome
  | CreateHomeSuccess
  | CreateHomeFail
  | UpdateHome
  | UpdateHomeSuccess
  | UpdateHomeFail
  | DeleteHome
  | DeleteHomeSuccess
  | DeleteHomeFail;
