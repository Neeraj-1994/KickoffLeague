import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticketmodal',
  templateUrl: './ticketmodal.component.html',
  styleUrls: ['./ticketmodal.component.css']
})
export class TicketmodalComponent implements OnInit {

  @Input() public ticket;
  constructor() { }

  ngOnInit() {
    console.log(this.ticket);
  }

}
