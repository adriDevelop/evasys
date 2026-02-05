import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDepartamentos } from './principal-departamentos';

describe('PrincipalDepartamentos', () => {
  let component: PrincipalDepartamentos;
  let fixture: ComponentFixture<PrincipalDepartamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalDepartamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalDepartamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
