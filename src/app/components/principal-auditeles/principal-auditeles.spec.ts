import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAuditeles } from './principal-auditeles';

describe('PrincipalAuditeles', () => {
  let component: PrincipalAuditeles;
  let fixture: ComponentFixture<PrincipalAuditeles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAuditeles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAuditeles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
