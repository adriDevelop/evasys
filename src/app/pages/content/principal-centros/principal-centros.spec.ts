import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalCentros } from './principal-centros';

describe('PrinciparCentros', () => {
  let component: PrincipalCentros;
  let fixture: ComponentFixture<PrincipalCentros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalCentros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalCentros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
