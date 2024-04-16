import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureForecastsComponent } from './future-forecasts.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";
import { ParametersService } from "../../../../core/services/parameters.service";
import { ParametersServiceStub } from "../../../../shared/testing-mocks/parametersServiceStub";
import { SearchResultStub } from "../../../../shared/testing-mocks/searchResultStub";
import { FutureForecastsStub } from "../../../../shared/testing-mocks/futureForecastsStub";
import { of } from "rxjs";

describe('FutureForecastsComponent', () => {
  let component: FutureForecastsComponent;
  let fixture: ComponentFixture<FutureForecastsComponent>;
  let parametersService: ParametersService;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureForecastsComponent],
      providers: [
        {provide: WeatherService, useClass: WeatherServiceStub},
        {provide: ParametersService, useClass: ParametersServiceStub},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FutureForecastsComponent);
    component = fixture.componentInstance;
    parametersService = TestBed.inject(ParametersService);
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch FiveDaysForecasts when ngOnInit is called', () => {
    const cityKey = SearchResultStub.Key;
    const searchResult = SearchResultStub;
    const forecasts = FutureForecastsStub;

    parametersService.getSearchResult = jasmine.createSpy().and.returnValue(of(searchResult));
    weatherService.getFiveDaysForecasts = jasmine.createSpy().and.returnValue(of(forecasts));
    spyOn(parametersService, "setFiveDaysForecasts");

    component.ngOnInit();

    expect(weatherService.getFiveDaysForecasts).toHaveBeenCalledWith(cityKey);
    expect(parametersService.setFiveDaysForecasts).toHaveBeenCalledWith(forecasts.DailyForecasts);
  });

  it('should not fetch FiveDaysForecasts if searchResult does not have a key', () => {
    const forecasts = FutureForecastsStub;

    spyOn(parametersService, 'getSearchResult').and.returnValue(of({Key: ''}));
    spyOn(weatherService, 'getFiveDaysForecasts').and.returnValue(of(forecasts));

    component.ngOnInit();

    expect(weatherService.getFiveDaysForecasts).not.toHaveBeenCalled();
  });

});
