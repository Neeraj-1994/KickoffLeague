import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchBetComponent } from './match-bet.component';

const routes: Routes = [
  {
    path: '',
    component: MatchBetComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchBetRoutingModule { }
