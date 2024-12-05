import { TestBed } from '@angular/core/testing';

import { CODApproveService } from './cod-approve.service';

describe('CODApproveService', () => {
  let service: CODApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CODApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
