import {Component, Input, OnInit} from '@angular/core';
import * as fromTeam from '../state/admin.reducer';
import {Store} from '@ngrx/store';
import {AdminService} from '../admin.service';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LinesmanValidator, TeamValidator} from '../../_validators/match.validator';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  @Input() team;
  @Input() team2;
  officials = [];
  linesman = [];
  Stadium = [];
  fixtureForm: FormGroup;
  matchName;

  constructor(private store: Store<fromTeam.AppState>, private matchService: AdminService, private fb: FormBuilder) { }

  ngOnInit() {
    this.matchName = this.team.Name + ' vs ' + this.team2.Name;

    this.fixtureForm = this.fb.group({
      MatchName: [{value: this.matchName, disabled: true}],
      Stadium: ['', Validators.required],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      TicketCost: ['', Validators.required],
      Referee: [''],
      Linesman1: [''],
      Linesman2: [''],
      Team1Name: [this.team.Name],
      Team2Name: [this.team2.Name],
      Team1Manager: [this.team.Manager],
      Team2Manager: [this.team2.Manager],
      Team1Coach: [this.team.Coach],
      Team2Coach: [this.team2.Coach],
      Team1: this.fb.group({
        Players: this.fb.array([])
      }),
      Team2: this.fb.group({
        Players: this.fb.array([])
      })
    }, {validator: [LinesmanValidator, TeamValidator]});

    this.patch();

    this.matchService.getOfficials()
      .subscribe(data => this.officials = data);
    this.matchService.getLinesman()
      .subscribe(data => this.linesman = data);
    this.matchService.getStadium()
      .subscribe(data => this.Stadium = data);
  }

  patch() {
    const control = this.fixtureForm.get('Team1.Players') as FormArray;
    this.team.Players.forEach(x => {
      control.push(this.patchValues(x.Name, x.tNumber, x.Role));
    });
  }

  patchValues(Name, tNumber, Role) {
    return this.fb.group({
      Name: [Name],
      tNumber: [tNumber],
      Role: [Role]
    });
  }

  createMatch() {
    this.matchService.sendMatch(this.fixtureForm.value)
      .subscribe(
        response => {
          console.log('Success!', response);
        },
        error => {
          console.log('Error', error);
        });
  }

}
