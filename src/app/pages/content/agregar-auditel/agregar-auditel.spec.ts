import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAuditel } from './agregar-auditel';

describe('AgregarAuditel', () => {
  let component: AgregarAuditel;
  let fixture: ComponentFixture<AgregarAuditel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAuditel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAuditel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
