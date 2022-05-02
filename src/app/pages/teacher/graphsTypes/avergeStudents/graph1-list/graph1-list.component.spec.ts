import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph1ListComponent } from './graph1-list.component';

describe('Graph1ListComponent', () => {
  let component: Graph1ListComponent;
  let fixture: ComponentFixture<Graph1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graph1ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Graph1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
