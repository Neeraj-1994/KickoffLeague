import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import {FixtureComponent} from './fixture/fixture.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: '',
    component: FixtureComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
