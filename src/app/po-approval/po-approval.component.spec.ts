import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoApprovalComponent } from './po-approval.component';

describe('PoApprovalComponent', () => {
  let component: PoApprovalComponent;
  let fixture: ComponentFixture<PoApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoApprovalComponent]
    });
    fixture = TestBed.createComponent(PoApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
