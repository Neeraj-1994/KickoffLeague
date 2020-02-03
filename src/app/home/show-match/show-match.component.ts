import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-match',
  templateUrl: './show-match.component.html',
  styleUrls: ['./show-match.component.css']
})
export class ShowMatchComponent implements OnInit {

  @Input() match;

  constructor() { }

  ngOnInit() {
  }

}
