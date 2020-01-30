import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchComponent } from './match.component';
import {TicketmodalComponent} from './ticketmodal/ticketmodal.component';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent
  },
  {
    path: 'TicketModal',
    component: TicketmodalComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
