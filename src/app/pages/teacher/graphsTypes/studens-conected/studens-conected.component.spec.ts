import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudensConectedComponent } from './studens-conected.component';

describe('StudensConectedComponent', () => {
  let component: StudensConectedComponent;
  let fixture: ComponentFixture<StudensConectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudensConectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudensConectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
