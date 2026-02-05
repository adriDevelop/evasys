import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosList } from './centros-list';

describe('CentrosList', () => {
  let component: CentrosList;
  let fixture: ComponentFixture<CentrosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentrosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
