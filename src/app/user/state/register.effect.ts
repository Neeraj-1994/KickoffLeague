import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { RegisterService} from '../register/register.service';
import * as userActions from '../state/register.actions';
import { User} from '../register/register.model';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: RegisterService
  ) {}


  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUser>(
      userActions.UserActionTypes.LOAD_USER
    ),
    mergeMap((action: userActions.LoadUser) =>
      this.userService.getUserById(action.payload).pipe(
        map(
          (team: User) =>
            new userActions.LoadUserSuccess(team)
        ),
        catchError(err => of(new userActions.LoadUserFail(err)))
      )
    )
  );

  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.CreateUser>(
      userActions.UserActionTypes.CREATE_USER
    ),
    map((action: userActions.CreateUser) => action.payload),
    mergeMap((team: User) =>
      this.userService.createUser(team).pipe(
        map(
          (newUser: User) =>
            new userActions.CreateUserSuccess(newUser)
        ),
        catchError(err => of(new userActions.CreateUserFail(err)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UpdateUser>(
      userActions.UserActionTypes.UPDATE_USER
    ),
    map((action: userActions.UpdateUser) => action.payload),
    mergeMap((team: User) =>
      this.userService.updateUser(team).pipe(
        map(
          (updateUser: User) =>
            new userActions.UpdateUserSuccess({
              id: updateUser.firstName,
              changes: updateUser
            })
        ),
        catchError(err => of(new userActions.UpdateUserFail(err)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.DeleteUser>(
      userActions.UserActionTypes.DELETE_USER
    ),
    map((action: userActions.DeleteUser) => action.payload),
    mergeMap((id: number) =>
      this.userService.deleteUser(id).pipe(
        map(() => new userActions.DeleteUserSuccess(id)),
        catchError(err => of(new userActions.DeleteUserFail(err)))
      )
    )
  );
}
