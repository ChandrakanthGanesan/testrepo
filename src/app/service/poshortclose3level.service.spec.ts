import { TestBed } from '@angular/core/testing';

import { Poshortclose3levelService } from './poshortclose3level.service';

describe('Poshortclose3levelService', () => {
  let service: Poshortclose3levelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Poshortclose3levelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
