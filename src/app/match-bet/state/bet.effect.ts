import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BetService } from '../bet.service';
import * as betActions from '../state/bet.actions';
import { Bet } from '../bet.model';

@Injectable()
export class BetEffect {
  constructor(
    private actions$: Actions,
    private betService: BetService
  ) {}

  @Effect()
  loadBets$: Observable<Action> = this.actions$.pipe(
    ofType<betActions.LoadBets>(
      betActions.BetActionTypes.LOAD_BETS
    ),
    mergeMap((action: betActions.LoadBets) =>
      this.betService.getBets().pipe(
        map(
          (bets: Bet[]) =>
            new betActions.LoadBetsSuccess(bets)
        ),
        catchError(err => of(new betActions.LoadBetsFail(err)))
      )
    )
  );

  @Effect()
  loadBet$: Observable<Action> = this.actions$.pipe(
    ofType<betActions.LoadBet>(
      betActions.BetActionTypes.LOAD_BET
    ),
    mergeMap((action: betActions.LoadBet) =>
      this.betService.getBetByName(action.payload).pipe(
        map(
          (bet: Bet) =>
            new betActions.LoadBetSuccess(bet)
        ),
        catchError(err => of(new betActions.LoadBetFail(err)))
      )
    )
  );

  @Effect()
  createBet$: Observable<Action> = this.actions$.pipe(
    ofType<betActions.CreateBet>(
      betActions.BetActionTypes.CREATE_BET
    ),
    map((action: betActions.CreateBet) => action.payload),
    mergeMap((bet: Bet) =>
      this.betService.createBet(bet).pipe(
        map(
          (newBet: Bet) =>
            new betActions.CreateBetSuccess(newBet)
        ),
        catchError(err => of(new betActions.CreateBetFail(err)))
      )
    )
  );

  @Effect()
  updateBet$: Observable<Action> = this.actions$.pipe(
    ofType<betActions.UpdateBet>(
      betActions.BetActionTypes.UPDATE_BET
    ),
    map((action: betActions.UpdateBet) => action.payload),
    mergeMap((bet: Bet) =>
      this.betService.updateBet(bet).pipe(
        map(
          (updateBet: Bet) =>
            new betActions.UpdateBetSuccess({
              id: updateBet.id,
              changes: updateBet
            })
        ),
        catchError(err => of(new betActions.UpdateBetFail(err)))
      )
    )
  );

  @Effect()
  deleteBet$: Observable<Action> = this.actions$.pipe(
    ofType<betActions.DeleteBet>(
      betActions.BetActionTypes.DELETE_BET
    ),
    map((action: betActions.DeleteBet) => action.payload),
    mergeMap((id: number) =>
      this.betService.deleteBet(id).pipe(
        map(() => new betActions.DeleteBetSuccess(id)),
        catchError(err => of(new betActions.DeleteBetFail(err)))
      )
    )
  );
}
