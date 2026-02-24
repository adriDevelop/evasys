import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambiarPassCood } from './dialog-cambiar-pass-cood';

describe('DialogCambiarPassCood', () => {
  let component: DialogCambiarPassCood;
  let fixture: ComponentFixture<DialogCambiarPassCood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCambiarPassCood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCambiarPassCood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
