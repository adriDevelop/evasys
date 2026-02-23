import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadosFormComponent } from './abogados-form-component';

describe('AbogadosFormComponent', () => {
  let component: AbogadosFormComponent;
  let fixture: ComponentFixture<AbogadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbogadosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbogadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
