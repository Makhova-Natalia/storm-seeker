import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureForecastsComponent } from './future-forecasts.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";
import { ParametersService } from "../../../../core/services/parameters.service";
import { ParametersServiceStub } from "../../../../shared/testing-mocks/parametersServiceStub";

describe('FutureForecastsComponent', () => {
  let component: FutureForecastsComponent;
  let fixture: ComponentFixture<FutureForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureForecastsComponent],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
        { provide: ParametersService, useClass: ParametersServiceStub },
      ]
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
