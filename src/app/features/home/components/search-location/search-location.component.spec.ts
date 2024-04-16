import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationComponent } from './search-location.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";
import { LoadingService } from "../../../../core/services/loading.service";
import { LoadingServiceStub } from "../../../../shared/testing-mocks/loadingServiceStub";
import { ParametersService } from "../../../../core/services/parameters.service";
import { ParametersServiceStub } from "../../../../shared/testing-mocks/parametersServiceStub";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { SearchResultStub } from "../../../../shared/testing-mocks/searchResultStub";
import { SearchResult } from "../../../../core/models/weather.model";

describe('SearchLocationComponent', () => {
  const cityName = 'London';
  const searchResult: SearchResult[] = [SearchResultStub, SearchResultStub];

  let component: SearchLocationComponent;
  let fixture: ComponentFixture<SearchLocationComponent>;
  let parametersService: ParametersService;
  let loadingService: LoadingService;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLocationComponent, BrowserAnimationsModule],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
        { provide: LoadingService, useClass: LoadingServiceStub },
        { provide: ParametersService, useClass: ParametersServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLocationComponent);
    component = fixture.componentInstance;
    parametersService = TestBed.inject(ParametersService);
    loadingService = TestBed.inject(LoadingService);
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to false and isEmpty to true if no search results are returned', () => {
    const emptySearchResult: SearchResult[] = [];

    weatherService.searchLocation = jasmine.createSpy().and.returnValue(of(emptySearchResult));
    spyOn(loadingService, "setLoading");
    spyOn(parametersService, "setIsEmpty");

    component['fetchWeatherData'](cityName);

    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
    expect(parametersService.setIsEmpty).toHaveBeenCalledWith(true);
  });

  it('should set loading to false and isEmpty to false if search results are returned', () => {
    weatherService.searchLocation = jasmine.createSpy().and.returnValue(of(searchResult));
    spyOn(loadingService, "setLoading");
    spyOn(parametersService, "setIsEmpty");
    spyOn(parametersService, "setSearchResult");

    component['fetchWeatherData'](cityName);

    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
    expect(parametersService.setIsEmpty).toHaveBeenCalledWith(false);
    expect(parametersService.setSearchResult).toHaveBeenCalledWith(searchResult[0]);
  });

  it('should call getWeatherConditions if search results are returned', () => {
    weatherService.searchLocation = jasmine.createSpy().and.returnValue(of(searchResult));
    spyOn(component, "getWeatherConditions");

    component['fetchWeatherData'](cityName);

    expect(component['getWeatherConditions']).toHaveBeenCalledWith(searchResult[0].Key);
  });

});
