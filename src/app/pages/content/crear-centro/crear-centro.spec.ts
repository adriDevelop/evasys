import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCentro } from './crear-centro';

describe('CrearCentro', () => {
  let component: CrearCentro;
  let fixture: ComponentFixture<CrearCentro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCentro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCentro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
