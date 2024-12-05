import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejPOApprovalComponent } from './rej-poapproval.component';

describe('RejPOApprovalComponent', () => {
  let component: RejPOApprovalComponent;
  let fixture: ComponentFixture<RejPOApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejPOApprovalComponent]
    });
    fixture = TestBed.createComponent(RejPOApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
