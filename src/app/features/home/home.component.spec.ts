import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WeatherService } from "../../core/services/weather.service";
import { WeatherServiceStub } from "../../shared/testing-mocks/weatherServiceStub";
import { ParametersService } from "../../core/services/parameters.service";
import { ParametersServiceStub } from "../../shared/testing-mocks/parametersServiceStub";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, BrowserAnimationsModule],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
        { provide: ParametersService, useClass: ParametersServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
