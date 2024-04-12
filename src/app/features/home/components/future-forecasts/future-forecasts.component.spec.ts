import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureForecastsComponent } from './future-forecasts.component';

describe('FutureForecastsComponent', () => {
  let component: FutureForecastsComponent;
  let fixture: ComponentFixture<FutureForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureForecastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FutureForecastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
