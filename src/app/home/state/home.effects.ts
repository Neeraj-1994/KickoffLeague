import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { HomeService } from "../home.service";
import * as homeActions from "./home.actions";
import { Home } from "../home.model";

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private homeService: HomeService
  ) {}

  @Effect()
  loadHomes$: Observable<Action> = this.actions$.pipe(
    ofType<homeActions.LoadHomes>(
      homeActions.HomeActionTypes.LOAD_HOMES
    ),
    mergeMap((action: homeActions.LoadHomes) =>
      this.homeService.getHomes().pipe(
        map(
          (homes: Home[]) =>
            new homeActions.LoadHomesSuccess(homes)
        ),
        catchError(err => of(new homeActions.LoadHomesFail(err)))
      )
    )
  );

  @Effect()
  loadHome$: Observable<Action> = this.actions$.pipe(
    ofType<homeActions.LoadHome>(
      homeActions.HomeActionTypes.LOAD_HOME
    ),
    mergeMap((action: homeActions.LoadHome) =>
      this.homeService.getHomeById(action.payload).pipe(
        map(
          (home: Home) =>
            new homeActions.LoadHomeSuccess(home)
        ),
        catchError(err => of(new homeActions.LoadHomeFail(err)))
      )
    )
  );

  @Effect()
  createHome$: Observable<Action> = this.actions$.pipe(
    ofType<homeActions.CreateHome>(
      homeActions.HomeActionTypes.CREATE_HOME
    ),
    map((action: homeActions.CreateHome) => action.payload),
    mergeMap((home: Home) =>
      this.homeService.createHome(home).pipe(
        map(
          (newHome: Home) =>
            new homeActions.CreateHomeSuccess(newHome)
        ),
        catchError(err => of(new homeActions.CreateHomeFail(err)))
      )
    )
  );

  @Effect()
  updateHome$: Observable<Action> = this.actions$.pipe(
    ofType<homeActions.UpdateHome>(
      homeActions.HomeActionTypes.UPDATE_HOME
    ),
    map((action: homeActions.UpdateHome) => action.payload),
    mergeMap((home: Home) =>
      this.homeService.updateHome(home).pipe(
        map(
          (updateHome: Home) =>
            new homeActions.UpdateHomeSuccess({
              id: updateHome.id,
              changes: updateHome
            })
        ),
        catchError(err => of(new homeActions.UpdateHomeFail(err)))
      )
    )
  );

  @Effect()
  deleteHome$: Observable<Action> = this.actions$.pipe(
    ofType<homeActions.DeleteHome>(
      homeActions.HomeActionTypes.DELETE_HOME
    ),
    map((action: homeActions.DeleteHome) => action.payload),
    mergeMap((id: number) =>
      this.homeService.deleteHome(id).pipe(
        map(() => new homeActions.DeleteHomeSuccess(id)),
        catchError(err => of(new homeActions.DeleteHomeFail(err)))
      )
    )
  );
}
