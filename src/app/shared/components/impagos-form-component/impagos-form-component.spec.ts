import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpagosFormComponent } from './impagos-form-component';

describe('ImpagosFormComponent', () => {
  let component: ImpagosFormComponent;
  let fixture: ComponentFixture<ImpagosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpagosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpagosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
