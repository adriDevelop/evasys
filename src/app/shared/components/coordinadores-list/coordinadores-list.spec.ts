import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadoresList } from './coordinadores-list';

describe('CoordinadoresList', () => {
  let component: CoordinadoresList;
  let fixture: ComponentFixture<CoordinadoresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinadoresList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinadoresList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
