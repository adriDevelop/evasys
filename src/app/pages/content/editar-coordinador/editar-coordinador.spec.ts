import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCoordinador } from './editar-coordinador';

describe('EditarCoordinador', () => {
  let component: EditarCoordinador;
  let fixture: ComponentFixture<EditarCoordinador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCoordinador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCoordinador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
