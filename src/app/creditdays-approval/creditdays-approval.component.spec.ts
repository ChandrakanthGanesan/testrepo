import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditdaysApprovalComponent } from './creditdays-approval.component';

describe('CreditdaysApprovalComponent', () => {
  let component: CreditdaysApprovalComponent;
  let fixture: ComponentFixture<CreditdaysApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditdaysApprovalComponent]
    });
    fixture = TestBed.createComponent(CreditdaysApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
