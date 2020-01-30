import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MatchRoutingModule } from './match-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { MatchComponent } from './match.component';

import {ticketReducer} from './state/ticket.reducer';
import {TicketEffect} from './state/ticket.effect';

import {TicketService} from './ticket.service';
import { TicketmodalComponent } from './ticketmodal/ticketmodal.component';


@NgModule({
  declarations: [MatchComponent, TicketmodalComponent],
  imports: [
    CommonModule,
    MatchRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    StoreModule.forFeature('tickets', ticketReducer),
    EffectsModule.forFeature([TicketEffect])
  ],
  providers: [TicketService],
  entryComponents: [TicketmodalComponent]
})
export class MatchModule { }
