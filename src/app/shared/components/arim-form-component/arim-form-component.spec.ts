import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArimFormComponent } from './arim-form-component';

describe('ArimFormComponent', () => {
  let component: ArimFormComponent;
  let fixture: ComponentFixture<ArimFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArimFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
