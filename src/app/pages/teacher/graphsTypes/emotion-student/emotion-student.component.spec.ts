import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionStudentComponent } from './emotion-student.component';

describe('EmotionStudentComponent', () => {
  let component: EmotionStudentComponent;
  let fixture: ComponentFixture<EmotionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
