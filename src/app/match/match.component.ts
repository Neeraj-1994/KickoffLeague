import { Component, OnInit } from '@angular/core';
import {faTicketAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {Ticket} from './ticket.model';
import * as ticketActions from './state/ticket.actions';
import * as fromTicket from './state/ticket.reducer';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { TicketmodalComponent } from './ticketmodal/ticketmodal.component';

import {ToastrService} from 'ngx-toastr';
import {TicketService} from './ticket.service';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  ticketIcon = faTicketAlt;
  teams = [];

// Form Component Shortening
  get firstName() {
    return this.ticketingForm.get('firstName');
  }
  get lastName() {
    return this.ticketingForm.get('lastName');
  }
  get email() {
    return this.ticketingForm.get('email');
  }
  get CardNumber() {
    return this.ticketingForm.get('CardNumber');
  }
  get cVV() {
    return this.ticketingForm.get('cVV');
  }
  get ExpiryDate() {
    return this.ticketingForm.get('ExpiryDate');
  }
  get Match() {
    return this.ticketingForm.get('Match');
  }

  constructor(private fb: FormBuilder,
              private store: Store<fromTicket.AppState>,
              private router: Router,
              private toastr: ToastrService,
              private matchService: TicketService,
              private modalService: NgbModal) {}

  ticketingForm: FormGroup;


  ngOnInit() {
    this.ticketingForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      CardNumber: ['', [Validators.required]],
      cVV: ['', [Validators.required]],
      ExpiryDate: ['', Validators.required],
      Match: ['', Validators.required]
    });

    this.matchService.getMatches()
      .subscribe(data => this.teams = data);
  }

  createTicket() {
    const newTicket: Ticket = {
      id: this.ticketingForm.get('id').value,
      firstName: this.ticketingForm.get('firstName').value,
      lastName: this.ticketingForm.get('lastName').value,
      email: this.ticketingForm.get('email').value,
      CardNumber: this.ticketingForm.get('CardNumber').value,
      CVV: this.ticketingForm.get('cVV').value,
      ExpDate: this.ticketingForm.get('ExpiryDate').value,
      Match: this.ticketingForm.get('Match').value
    };

    this.store.dispatch(new ticketActions.CreateTicket(newTicket));
    this.toastr.success('Thank you for buying the ticket!', 'Success!');

    this.ticketingForm.reset();
  }

  /* openModal() {
    const modalRef = this.modalService.open(TicketmodalComponent);
    modalRef.componentInstance.ticket = this.teams;
  }
   */
}
