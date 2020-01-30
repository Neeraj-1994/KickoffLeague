import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetmodalComponent } from './betmodal.component';

describe('BetmodalComponent', () => {
  let component: BetmodalComponent;
  let fixture: ComponentFixture<BetmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
