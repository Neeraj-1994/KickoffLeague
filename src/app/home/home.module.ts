import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ShowMatchComponent } from './show-match/show-match.component';
import {StoreModule} from '@ngrx/store';
import {homeReducer} from './state/home.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HomeEffect} from './state/home.effects';
import {HomeService} from './home.service';


@NgModule({
  declarations: [HomeComponent, ShowMatchComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    StoreModule.forFeature('homes', homeReducer),
    EffectsModule.forFeature([HomeEffect])
  ],
  providers: [HomeService]
})
export class HomeModule { }
