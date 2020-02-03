import { Component, OnInit } from '@angular/core';
import {faMoneyBill, faTicketAlt} from '@fortawesome/free-solid-svg-icons';
import {select, Store} from '@ngrx/store';
import * as homeActions from './state/home.actions';
import * as fromHome from './state/home.reducer';
import {Observable} from 'rxjs';
import {Home} from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ticketIcon = faTicketAlt;
  betIcon = faMoneyBill;
  matches$: Observable<Home[]>;
  error$: Observable<any>;
  selectedMatch;
  selected = false;

  constructor(private store: Store<fromHome.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new homeActions.LoadHomes());
    this.matches$ = this.store.pipe(select(fromHome.getHomes));
    this.error$ = this.store.pipe(select(fromHome.getError));
  }

  showMatch(match: Home) {
    this.selectedMatch = match;
    this.selected = true;
  }

}
