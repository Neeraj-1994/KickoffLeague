import { Component, OnInit } from '@angular/core';
import {faMoneyBill, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import * as betActions from './state/bet.actions';
import * as fromBet from './state/bet.reducer';

import {BetService} from './bet.service';
import {Bet} from './bet.model';


@Component({
  selector: 'app-match-bet',
  templateUrl: './match-bet.component.html',
  styleUrls: ['./match-bet.component.css']
})
export class MatchBetComponent implements OnInit {
          betIcon = faMoneyBill;
          closeIcon = faWindowClose;
          teams = [];
          betForm: FormGroup;

  // Form Component Shortening
  get firstName() {
    return this.betForm.get('firstName');
  }
  get lastName() {
    return this.betForm.get('lastName');
  }
  get email() {
    return this.betForm.get('email');
  }
  get CardNumber() {
    return this.betForm.get('CardNumber');
  }
  get cVV() {
    return this.betForm.get('cVV');
  }
  get ExpiryDate() {
    return this.betForm.get('ExpiryDate');
  }
  get Match() {
    return this.betForm.get('Match');
  }
  get SelTeam() {
    return this.betForm.get('SelTeam');
  }
  get FinalScore() {
    return this.betForm.get('FinalScore');
  }
  get BetAmount() {
    return this.betForm.get('BetAmount');
  }

          constructor(private fb: FormBuilder, private store: Store<fromBet.AppState>,
                      private router: Router, private toastr: ToastrService,
                      private matchService: BetService) {}

                      ngOnInit() {
            this.betForm = this.fb.group({
              id: [''],
              firstName: ['', Validators.required],
              lastName: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              CardNumber: ['', [Validators.required, Validators.minLength(3)]],
              cVV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
              ExpiryDate: ['', Validators.required],
              Match: ['', Validators.required],
              SelTeam: ['', Validators.required],
              FinalScore: ['', Validators.required],
              BetAmount: ['', Validators.required]
            });

            this.matchService.getMatches()
              .subscribe(data => this.teams = data);
          }


  createBet() {
    const newBet: Bet = {
      id: this.betForm.get('id').value,
      firstName: this.betForm.get('firstName').value,
      lastName: this.betForm.get('lastName').value,
      email: this.betForm.get('email').value,
      CardNumber: this.betForm.get('CardNumber').value,
      CVV: this.betForm.get('cVV').value,
      ExpDate: this.betForm.get('ExpiryDate').value,
      Match: this.betForm.get('Match').value,
      SelectedTeamName: this.betForm.get('SelTeam').value,
      FinalScore: this.betForm.get('FinalScore').value,
      BetAmount: this.betForm.get('BetAmount').value
    };

    this.store.dispatch(new betActions.CreateBet(newBet));
    this.betForm.reset();
    this.router.navigate(['/Home']);
  }
}
