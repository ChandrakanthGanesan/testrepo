import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalporeviewComponent } from './capitalporeview.component';

describe('CapitalporeviewComponent', () => {
  let component: CapitalporeviewComponent;
  let fixture: ComponentFixture<CapitalporeviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalporeviewComponent]
    });
    fixture = TestBed.createComponent(CapitalporeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
