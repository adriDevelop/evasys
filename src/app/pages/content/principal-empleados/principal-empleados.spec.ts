import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEmpleados } from './principal-empleados';

describe('PrincipalEmpleados', () => {
  let component: PrincipalEmpleados;
  let fixture: ComponentFixture<PrincipalEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalEmpleados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalEmpleados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
