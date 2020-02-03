import {Component, Input, OnInit} from '@angular/core';
import * as fromTeam from '../state/admin.reducer';
import {Store} from '@ngrx/store';
import {AdminService} from '../admin.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LinesmanValidator, TeamValidator} from '../../_validators/match.validator';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  constructor(private store: Store<fromTeam.AppState>, private matchService: AdminService, private fb: FormBuilder, private router: Router,
              private toastr: ToastrService) {
  }

  @Input() team;
  @Input() team2;
  closeIcon = faWindowClose;
  officials = [];
  linesman = [];
  Stadium = [];
  fixtureForm: FormGroup;
  matchName;

  // Form Component Shortening
  get stadium() {
    return this.fixtureForm.get('Stadium');
  }
  get date() {
    return this.fixtureForm.get('Date');
  }
  get time() {
    return this.fixtureForm.get('Time');
  }
  get ticket() {
    return this.fixtureForm.get('TicketCost');
  }
  get ref() {
    return this.fixtureForm.get('Referee');
  }
  get lines1() {
    return this.fixtureForm.get('Linesman1');
  }

    ngOnInit() {
    this.matchName = this.team.Name + ' vs ' + this.team2.Name;
    this.fixtureForm = this.fb.group({
      MatchName: [this.matchName],
      Stadium: ['', Validators.required],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      TicketCost: ['', Validators.required],
      Referee: ['', Validators.required],
      Linesman1: ['', Validators.required],
      Linesman2: ['', Validators.required],
      Team1Name: [this.team.Name],
      Team1Manager: [this.team.Manager],
      Team1Coach: [this.team.Coach],
      Team1Players: this.fb.array([]),
      Team2Name: [this.team2.Name],
      Team2Manager: [this.team2.Manager],
      Team2Coach: [this.team2.Coach],
      Team2Players: this.fb.array([])
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
    const control = <FormArray>this.fixtureForm.get('Team1Players');
    this.team.Players.forEach(x => {
      control.push(this.patchValues(x.Name, x.tNumber, x.Role))
    });
    const control2 = <FormArray>this.fixtureForm.get('Team2Players');
    this.team2.Players.forEach(y => {
      control2.push(this.patchValues(y.Name, y.tNumber, y.Role))
    });
  }

  patchValues(Name, tNumber, Role) {
    return this.fb.group({
      Name: [Name],
      tNumber: [tNumber],
      Role: [Role]
    })
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
    this.toastr.success('Match has been created. Go to Home Page to view.', 'Match Creation Success!');
  }


}
