import { Component, OnInit } from '@angular/core';
import {faMoneyBill, faTicketAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ticketIcon = faTicketAlt;
  betIcon = faMoneyBill;

  constructor() { }

  ngOnInit() {
  }

}
