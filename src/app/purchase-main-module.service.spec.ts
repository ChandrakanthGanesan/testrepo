import { TestBed } from '@angular/core/testing';

import { PurchaseMainModuleService } from './purchase-main-module.service';

describe('PurchaseMainModuleService', () => {
  let service: PurchaseMainModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseMainModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
