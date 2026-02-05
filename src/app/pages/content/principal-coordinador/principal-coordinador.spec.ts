import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalCoordinador } from './principal-coordinador';

describe('PrincipalCoordinador', () => {
  let component: PrincipalCoordinador;
  let fixture: ComponentFixture<PrincipalCoordinador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalCoordinador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalCoordinador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
