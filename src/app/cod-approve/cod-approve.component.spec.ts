import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CODApproveComponent } from './cod-approve.component';

describe('CODApproveComponent', () => {
  let component: CODApproveComponent;
  let fixture: ComponentFixture<CODApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CODApproveComponent]
    });
    fixture = TestBed.createComponent(CODApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
