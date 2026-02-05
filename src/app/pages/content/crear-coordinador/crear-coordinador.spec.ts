import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCoordinador } from './crear-coordinador';

describe('CrearCoordinador', () => {
  let component: CrearCoordinador;
  let fixture: ComponentFixture<CrearCoordinador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCoordinador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCoordinador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
