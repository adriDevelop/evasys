import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboudFormComponent } from './inboud-form-component';

describe('InboudFormComponent', () => {
  let component: InboudFormComponent;
  let fixture: ComponentFixture<InboudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboudFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
