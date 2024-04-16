import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteComponent } from './add-favorite.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";
import { BehaviorSubject } from "rxjs";
import { ParametersService } from "../../../../core/services/parameters.service";
import { ParametersServiceStub } from "../../../../shared/testing-mocks/parametersServiceStub";

describe('AddFavoriteComponent', () => {
  let component: AddFavoriteComponent;
  let fixture: ComponentFixture<AddFavoriteComponent>;
  let weatherService: WeatherService;
  let parametersService: ParametersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFavoriteComponent],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
        { provide: ParametersService, useClass: ParametersServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavoriteComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    parametersService = TestBed.inject(ParametersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle favorite', () => {
    const id = '123';
    const isFavoriteSubject$$ = new BehaviorSubject<boolean>(false);
    component['id'] = id;
    component['isFavoriteSubject$$'] = isFavoriteSubject$$;

    spyOn(parametersService, "setIsFavorite").and.callThrough();

    component.toggleFavorite();

    expect(parametersService.setIsFavorite).toHaveBeenCalledWith(true);
  });
});
