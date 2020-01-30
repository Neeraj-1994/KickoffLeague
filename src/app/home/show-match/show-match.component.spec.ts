import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMatchComponent } from './show-match.component';

describe('ShowMatchComponent', () => {
  let component: ShowMatchComponent;
  let fixture: ComponentFixture<ShowMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
