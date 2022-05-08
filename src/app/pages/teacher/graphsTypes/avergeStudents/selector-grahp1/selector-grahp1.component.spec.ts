import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGraph1Component } from './selector-grahp1.component';

describe('SelectorGrahp1Component', () => {
  let component: SelectorGraph1Component;
  let fixture: ComponentFixture<SelectorGraph1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorGraph1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorGraph1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
