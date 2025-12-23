import { TestBed } from '@angular/core/testing';

import { AcceptedService } from './accepted-service';

describe('AcceptedService', () => {
  let service: AcceptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
