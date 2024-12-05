import { TestBed } from '@angular/core/testing';

import { Poshortclose2levelService } from './poshortclose2level.service';

describe('Poshortclose2levelService', () => {
  let service: Poshortclose2levelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Poshortclose2levelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
