import { TestBed } from '@angular/core/testing';

import { PoapprovalService } from './poapproval.service';

describe('PoapprovalService', () => {
  let service: PoapprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoapprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
