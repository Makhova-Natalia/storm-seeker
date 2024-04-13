import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { WeatherConditions } from "../../../../core/models/weather.model";
import { WeatherService } from "../../../../core/services/weather.service";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { ICONS } from "../../../../core/models/weatherData.config";

@Component({
  selector: 'app-current-forecast',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './current-forecast.component.html',
  styleUrl: './current-forecast.component.css'
})
export class CurrentForecastComponent implements OnInit, OnDestroy {
  readonly ICON_URL: string = '../../../../assets/img';

  private currentForecast: WeatherConditions;
  private ICONS_NAME: { [key: string]: string } = ICONS;
  private iconNumber: number;
  private destroyed$$: Subject<void> = new Subject<void>();

  cityName: string;
  weatherIcon: string;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getCurrentForecast()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((val: WeatherConditions) => {
          this.currentForecast = val;
          this.iconNumber = val.WeatherIcon;
          this.weatherIcon = `${this.ICON_URL}/${this.ICONS_NAME[this.iconNumber]}`
        })
      )
      .subscribe();
    console.log(this.weatherService.getCityName())

    this.cityName = this.weatherService.getCityName();
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

}
