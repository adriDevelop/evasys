import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDepartamento } from './editar-departamento';

describe('EditarDepartamento', () => {
  let component: EditarDepartamento;
  let fixture: ComponentFixture<EditarDepartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDepartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDepartamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
