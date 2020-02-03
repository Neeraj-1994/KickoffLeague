import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { AdminService} from '../admin.service';
import * as teamActions from '../state/admin.actions';
import { Team } from '../admin.model';

@Injectable()
export class TeamEffect {
  constructor(
    private actions$: Actions,
    private teamService: AdminService
  ) {}

  @Effect()
  loadTeams$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.LoadTeams>(
      teamActions.TeamActionTypes.LOAD_TEAMS
    ),
    mergeMap((action: teamActions.LoadTeams) =>
      this.teamService.getTeams().pipe(
        map(
          (teams: Team[]) =>
            new teamActions.LoadTeamsSuccess(teams)
        ),
        catchError(err => of(new teamActions.LoadTeamsFail(err)))
      )
    )
  );

  @Effect()
  loadTeam$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.LoadTeam>(
      teamActions.TeamActionTypes.LOAD_TEAM
    ),
    mergeMap((action: teamActions.LoadTeam) =>
      this.teamService.getTeamById(action.payload).pipe(
        map(
          (team: Team) =>
            new teamActions.LoadTeamSuccess(team)
        ),
        catchError(err => of(new teamActions.LoadTeamFail(err)))
      )
    )
  );

  @Effect()
  createTeam$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.CreateTeam>(
      teamActions.TeamActionTypes.CREATE_TEAM
    ),
    map((action: teamActions.CreateTeam) => action.payload),
    mergeMap((team: Team) =>
      this.teamService.createTeam(team).pipe(
        map(
          (newTeam: Team) =>
            new teamActions.CreateTeamSuccess(newTeam)
        ),
        catchError(err => of(new teamActions.CreateTeamFail(err)))
      )
    )
  );

  @Effect()
  updateTeam$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.UpdateTeam>(
      teamActions.TeamActionTypes.UPDATE_TEAM
    ),
    map((action: teamActions.UpdateTeam) => action.payload),
    mergeMap((team: Team) =>
      this.teamService.updateTeam(team).pipe(
        map(
          (updateTeam: Team) =>
            new teamActions.UpdateTeamSuccess({
              id: updateTeam.id,
              changes: updateTeam
            })
        ),
        catchError(err => of(new teamActions.UpdateTeamFail(err)))
      )
    )
  );

  @Effect()
  deleteTeam$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.DeleteTeam>(
      teamActions.TeamActionTypes.DELETE_TEAM
    ),
    map((action: teamActions.DeleteTeam) => action.payload),
    mergeMap((id: number) =>
      this.teamService.deleteTeam(id).pipe(
        map(() => new teamActions.DeleteTeamSuccess(id)),
        catchError(err => of(new teamActions.DeleteTeamFail(err)))
      )
    )
  );
}
