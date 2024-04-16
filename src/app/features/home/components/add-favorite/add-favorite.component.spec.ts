import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteComponent } from './add-favorite.component';
import { WeatherService } from "../../../../core/services/weather.service";
import { WeatherServiceStub } from "../../../../shared/testing-mocks/weatherServiceStub";

describe('AddFavoriteComponent', () => {
  let component: AddFavoriteComponent;
  let fixture: ComponentFixture<AddFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFavoriteComponent],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
