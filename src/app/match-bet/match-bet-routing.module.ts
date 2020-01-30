import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchBetComponent } from './match-bet.component';
import {BetmodalComponent} from './betmodal/betmodal.component';

const routes: Routes = [
  {
    path: '',
    component: MatchBetComponent
  },
  {
    path: 'Betmodal',
    component: BetmodalComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchBetRoutingModule { }
