import { Component, OnInit } from '@angular/core';
import {Team} from './admin.model';

import * as teamActions from './state/admin.actions';
import * as fromTeam from './state/admin.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  officials = [];
  linesman = [];
  Stadium = [];
  selected = false;
  selected2 = false;
  count = 0;
  count2 = 0;

  selectedTeam;
  selectedTeam2;
  teams$: Observable<Team[]>;
  error$: Observable<string>;

  constructor(private store: Store<fromTeam.AppState>, private matchService: AdminService) { }

  ngOnInit() {
    this.store.dispatch(new teamActions.LoadTeams());
    this.teams$ = this.store.pipe(select(fromTeam.getTeams));
    this.error$ = this.store.pipe(select(fromTeam.getError));
  }

  addTeam(team: Team) {
    this.selectedTeam = team;
    this.count++;
    if (this.count >= 1) {
      this.selected = true;
    }
  }
  addTeam2(team2: Team) {
    this.selectedTeam2 = team2;
    this.count2++;
    if (this.count2 >= 1) {
      this.selected2 = true;
    }
  }

  deleteTeam(team: Team) {
    if (confirm('Are You Sure You want to Delete the User?')) {
      this.store.dispatch(new teamActions.DeleteTeam(team.id));
    }
  }

  editTeam(team: Team) {
    this.store.dispatch(new teamActions.LoadTeam(team.id));
  }
}
