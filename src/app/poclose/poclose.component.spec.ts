import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocloseComponent } from './poclose.component';

describe('PocloseComponent', () => {
  let component: PocloseComponent;
  let fixture: ComponentFixture<PocloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocloseComponent]
    });
    fixture = TestBed.createComponent(PocloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
