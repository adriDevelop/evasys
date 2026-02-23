import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvjFormComponent } from './avj-form-component';

describe('AvjFormComponent', () => {
  let component: AvjFormComponent;
  let fixture: ComponentFixture<AvjFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvjFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
