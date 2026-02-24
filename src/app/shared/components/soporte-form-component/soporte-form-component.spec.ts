import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteFormComponent } from './soporte-form-component';

describe('SoporteFormComponent', () => {
  let component: SoporteFormComponent;
  let fixture: ComponentFixture<SoporteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoporteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoporteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
