import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayWeatherItemComponent } from './one-day-weather-item.component';

describe('OneDayWeatherItemComponent', () => {
  let component: OneDayWeatherItemComponent;
  let fixture: ComponentFixture<OneDayWeatherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneDayWeatherItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneDayWeatherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
