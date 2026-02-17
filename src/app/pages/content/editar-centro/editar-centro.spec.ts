import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentro } from './editar-centro';

describe('EditarCentro', () => {
  let component: EditarCentro;
  let fixture: ComponentFixture<EditarCentro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCentro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCentro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
