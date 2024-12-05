import { TestBed } from '@angular/core/testing';

import { RejPOApprovalService } from './rej-poapproval.service';

describe('RejPOApprovalService', () => {
  let service: RejPOApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejPOApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
