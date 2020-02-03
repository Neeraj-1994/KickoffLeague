import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { Bet } from '../bet.model';

export enum BetActionTypes {
  LOAD_BETS = '[Bet] Load Bets',
  LOAD_BETS_SUCCESS = '[Bet] Load Bets Success',
  LOAD_BETS_FAIL = '[Bet] Load Bets Fail',
  LOAD_BET = '[Bet] Load Bet',
  LOAD_BET_SUCCESS = '[Bet] Load Bet Success',
  LOAD_BET_FAIL = '[Bet] Load Bet Fail',
  CREATE_BET = '[Bet] Create Bet',
  CREATE_BET_SUCCESS = '[Bet] Create Bet Success',
  CREATE_BET_FAIL = '[Bet] Create Bet Fail',
  UPDATE_BET = '[Bet] Update Bet',
  UPDATE_BET_SUCCESS = '[Bet] Update Bet Success',
  UPDATE_BET_FAIL = '[Bet] Update Bet Fail',
  DELETE_BET = '[Bet] Delete Bet',
  DELETE_BET_SUCCESS = '[Bet] Delete Bet Success',
  DELETE_BET_FAIL = '[Bet] Delete Bet Fail'
}

export class LoadBets implements Action {
  readonly type = BetActionTypes.LOAD_BETS;
}

export class LoadBetsSuccess implements Action {
  readonly type = BetActionTypes.LOAD_BETS_SUCCESS;

  constructor(public payload: Bet[]) {}
}

export class LoadBetsFail implements Action {
  readonly type = BetActionTypes.LOAD_BETS_FAIL;

  constructor(public payload: string) {}
}

export class LoadBet implements Action {
  readonly type = BetActionTypes.LOAD_BET;

  constructor(public payload: string) {}
}

export class LoadBetSuccess implements Action {
  readonly type = BetActionTypes.LOAD_BET_SUCCESS;

  constructor(public payload: Bet) {}
}

export class LoadBetFail implements Action {
  readonly type = BetActionTypes.LOAD_BET_FAIL;

  constructor(public payload: string) {}
}

export class CreateBet implements Action {
  readonly type = BetActionTypes.CREATE_BET;

  constructor(public payload: Bet) {}
}

export class CreateBetSuccess implements Action {
  readonly type = BetActionTypes.CREATE_BET_SUCCESS;

  constructor(public payload: Bet) {}
}

export class CreateBetFail implements Action {
  readonly type = BetActionTypes.CREATE_BET_FAIL;

  constructor(public payload: string) {}
}

export class UpdateBet implements Action {
  readonly type = BetActionTypes.UPDATE_BET;

  constructor(public payload: Bet) {}
}

export class UpdateBetSuccess implements Action {
  readonly type = BetActionTypes.UPDATE_BET_SUCCESS;

  constructor(public payload: Update<Bet>) {}
}

export class UpdateBetFail implements Action {
  readonly type = BetActionTypes.UPDATE_BET_FAIL;

  constructor(public payload: string) {}
}

export class DeleteBet implements Action {
  readonly type = BetActionTypes.DELETE_BET;

  constructor(public payload: number) {}
}

export class DeleteBetSuccess implements Action {
  readonly type = BetActionTypes.DELETE_BET_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteBetFail implements Action {
  readonly type = BetActionTypes.DELETE_BET_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadBets
  | LoadBetsSuccess
  | LoadBetsFail
  | LoadBet
  | LoadBetSuccess
  | LoadBetFail
  | CreateBet
  | CreateBetSuccess
  | CreateBetFail
  | UpdateBet
  | UpdateBetSuccess
  | UpdateBetFail
  | DeleteBet
  | DeleteBetSuccess
  | DeleteBetFail;
