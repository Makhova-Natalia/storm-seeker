import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../../../../core/services/weather.service";
import { Subject, switchMap, takeUntil } from "rxjs";
import { DailyForecast, FutureForecasts, SearchResult } from "../../../../core/models/weather.model";
import { MaterialModule } from "../../../../material-module";
import { CommonModule } from "@angular/common";
import {
  OneDayWeatherItemComponent
} from "../../../../shared/components/one-day-weather-item/one-day-weather-item.component";
import { ICONS } from "../../../../core/models/weatherData.config";

@Component({
  selector: 'app-future-forecasts',
  standalone: true,
  imports: [MaterialModule, CommonModule, OneDayWeatherItemComponent],
  templateUrl: './future-forecasts.component.html',
  styleUrl: './future-forecasts.component.css'
})
export class FutureForecastsComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  readonly ICON_URL: string = '../../../../assets/img/';

  ICONS_NAME: { [key: string]: string } = ICONS;
  fiveDaysForecasts: DailyForecast[] = [];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getSearchResult()
      .pipe(
        switchMap((city: SearchResult) => {
          return this.weatherService.getFiveDaysForecasts(city.Key);
        }),
        takeUntil(this.destroyed$$)
      )
      .subscribe((forecasts: FutureForecasts) => {
        this.fiveDaysForecasts = forecasts.DailyForecasts;
      });
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

}
