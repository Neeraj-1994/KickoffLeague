import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBetComponent } from './match-bet.component';

describe('MatchBetComponent', () => {
  let component: MatchBetComponent;
  let fixture: ComponentFixture<MatchBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
