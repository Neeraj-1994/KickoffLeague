import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import {AuthService} from './user/auth.service';

import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TokenInterceptorService} from './token-interceptor.service';
import {CustomSerializer} from './shared/util';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      timeOut: 50000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [AuthService, AuthGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
