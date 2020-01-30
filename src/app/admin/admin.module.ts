import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StoreModule} from '@ngrx/store';
import {teamReducer} from './state/admin.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TeamEffect} from './state/admin.effect';
import {AdminService} from './admin.service';
import { FixtureComponent } from './fixture/fixture.component';


@NgModule({
  declarations: [AdminComponent, FixtureComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forFeature('teams', teamReducer),
    EffectsModule.forFeature([TeamEffect])
  ],
  providers: [AdminService]
})
export class AdminModule { }
