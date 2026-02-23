import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalientesFormComponent } from './salientes-form-component';

describe('SalientesFormComponent', () => {
  let component: SalientesFormComponent;
  let fixture: ComponentFixture<SalientesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalientesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
