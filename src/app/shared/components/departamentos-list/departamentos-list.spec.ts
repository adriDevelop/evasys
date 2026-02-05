import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosList } from './departamentos-list';

describe('DepartamentosList', () => {
  let component: DepartamentosList;
  let fixture: ComponentFixture<DepartamentosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
