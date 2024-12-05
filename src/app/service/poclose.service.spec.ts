import { TestBed } from '@angular/core/testing';

import { PocloseService } from './poclose.service';

describe('PocloseService', () => {
  let service: PocloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
