import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationComponent } from './search-location.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";
import { LoadingService } from "../../../../core/services/loading.service";
import { LoadingServiceStub } from "../../../../shared/testing-mocks/loadingServiceStub";
import { ParametersService } from "../../../../core/services/parameters.service";
import { ParametersServiceStub } from "../../../../shared/testing-mocks/parametersServiceStub";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('SearchLocationComponent', () => {
  let component: SearchLocationComponent;
  let fixture: ComponentFixture<SearchLocationComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
