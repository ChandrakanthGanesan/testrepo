import { TestBed } from '@angular/core/testing';

import { NewpoService } from './newpo.service';

describe('NewpoService', () => {
  let service: NewpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});