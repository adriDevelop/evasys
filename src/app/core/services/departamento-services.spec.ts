import { TestBed } from '@angular/core/testing';

import { DepartamentoServices } from './departamento-services';

describe('DepartamentoServices', () => {
  let service: DepartamentoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
