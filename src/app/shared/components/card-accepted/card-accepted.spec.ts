import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccepted } from './card-accepted';

describe('CardAccepted', () => {
  let component: CardAccepted;
  let fixture: ComponentFixture<CardAccepted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAccepted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAccepted);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
