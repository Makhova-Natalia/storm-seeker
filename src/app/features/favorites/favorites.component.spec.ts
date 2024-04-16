import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { WeatherService } from "../../core/services/weather.service";
import { WeatherServiceStub } from "../../shared/testing-mocks/weatherServiceStub";

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
