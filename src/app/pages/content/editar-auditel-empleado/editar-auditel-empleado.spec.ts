import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAuditelEmpleado } from './editar-auditel-empleado';

describe('EditarAuditelEmpleado', () => {
  let component: EditarAuditelEmpleado;
  let fixture: ComponentFixture<EditarAuditelEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAuditelEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAuditelEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
