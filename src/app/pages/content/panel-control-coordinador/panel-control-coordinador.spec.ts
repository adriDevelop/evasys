import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControlCoordinador } from './panel-control-coordinador';

describe('PanelControlCoordinador', () => {
  let component: PanelControlCoordinador;
  let fixture: ComponentFixture<PanelControlCoordinador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelControlCoordinador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelControlCoordinador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
