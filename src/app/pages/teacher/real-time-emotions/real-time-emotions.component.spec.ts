import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeEmotionsComponent } from './real-time-emotions.component';

describe('RealTimeEmotionsComponent', () => {
  let component: RealTimeEmotionsComponent;
  let fixture: ComponentFixture<RealTimeEmotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeEmotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
