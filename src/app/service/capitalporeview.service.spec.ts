import { TestBed } from '@angular/core/testing';

import { CapitalporeviewService } from './capitalporeview.service';

describe('CapitalporeviewService', () => {
  let service: CapitalporeviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalporeviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
