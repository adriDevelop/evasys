import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditelesList } from './auditeles-list';

describe('AuditelesList', () => {
  let component: AuditelesList;
  let fixture: ComponentFixture<AuditelesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditelesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditelesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
