import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { MatchBetRoutingModule } from './match-bet-routing.module';

import { MatchBetComponent } from './match-bet.component';

import {betReducer} from './state/bet.reducer';
import {BetEffect} from './state/bet.effect';

import {BetService} from './bet.service';


@NgModule({
  declarations: [MatchBetComponent],
  imports: [
    CommonModule,
    MatchBetRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    StoreModule.forFeature('bets', betReducer),
    EffectsModule.forFeature([BetEffect])
  ],
  providers: [BetService, ToastrService]
})
export class MatchBetModule { }
