import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poshortclose2levelComponent } from './poshortclose2level.component';

describe('Poshortclose2levelComponent', () => {
  let component: Poshortclose2levelComponent;
  let fixture: ComponentFixture<Poshortclose2levelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Poshortclose2levelComponent]
    });
    fixture = TestBed.createComponent(Poshortclose2levelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
