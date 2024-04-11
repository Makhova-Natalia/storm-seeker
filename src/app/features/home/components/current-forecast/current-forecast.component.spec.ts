import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentForecastComponent } from './current-forecast.component';

describe('CurrentForecastComponent', () => {
  let component: CurrentForecastComponent;
  let fixture: ComponentFixture<CurrentForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentForecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
