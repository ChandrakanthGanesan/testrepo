import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poshortclose3levelComponent } from './poshortclose3level.component';

describe('Poshortclose3levelComponent', () => {
  let component: Poshortclose3levelComponent;
  let fixture: ComponentFixture<Poshortclose3levelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Poshortclose3levelComponent]
    });
    fixture = TestBed.createComponent(Poshortclose3levelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
