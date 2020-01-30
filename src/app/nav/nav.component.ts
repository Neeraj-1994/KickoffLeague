import { Component, OnInit } from '@angular/core';
import {faCog, faHome, faMoneyBill, faSignInAlt, faSignOutAlt, faTicketAlt, faUser, faUserSecret} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../user/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userIcon = faUser;
  loginIcon = faSignInAlt;
  homeIcon = faHome;
  ticketIcon = faTicketAlt;
  betIcon = faMoneyBill;
  adminIcon = faUserSecret;
  logoutIcon = faSignOutAlt;
  settings = faCog;
  title = 'KickOff League';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
