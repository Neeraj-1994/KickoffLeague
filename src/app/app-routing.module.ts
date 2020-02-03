import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminGuard} from './guard/admin.guard';
import {AuthGuard} from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'User',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'Admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'Match',
    loadChildren: () => import('./match/match.module').then(m => m.MatchModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'MatchBet',
    loadChildren: () => import('./match-bet/match-bet.module').then(m => m.MatchBetModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
