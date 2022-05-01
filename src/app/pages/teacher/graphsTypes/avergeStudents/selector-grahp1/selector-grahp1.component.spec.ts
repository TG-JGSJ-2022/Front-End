import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGrahp1Component } from './selector-grahp1.component';

describe('SelectorGrahp1Component', () => {
  let component: SelectorGrahp1Component;
  let fixture: ComponentFixture<SelectorGrahp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorGrahp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorGrahp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
