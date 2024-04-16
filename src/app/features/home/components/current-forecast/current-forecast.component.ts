import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { WeatherConditions } from "../../../../core/models/weather.model";
import { Subject, takeUntil, tap } from "rxjs";
import { ICONS } from "../../../../core/models/weatherData.config";
import { ParametersService } from "../../../../core/services/parameters.service";

@Component({
  selector: 'app-current-forecast',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './current-forecast.component.html',
  styleUrl: './current-forecast.component.css'
})
export class CurrentForecastComponent implements OnInit, OnDestroy {
  readonly ICON_URL: string = '../../../../assets/img';
  readonly DEGREE: string = '\xB0';

  private currentForecast: WeatherConditions;
  private ICONS_NAME: { [key: string]: string } = ICONS;
  private iconNumber: number;
  private destroyed$$: Subject<void> = new Subject<void>();

  cityName: string;
  weatherIcon: string;
  temperature: string;

  constructor(private parametersService: ParametersService) {
  }

  ngOnInit() {
    this.getDataForecast();
    this.setCityName();
  }

  private getDataForecast(): void {
    this.parametersService.getCurrentForecast()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((conditions: WeatherConditions) => {
          this.setDataForecast(conditions);
        })
      )
      .subscribe();
  }

  private setDataForecast(conditions: WeatherConditions): void {
    this.currentForecast = conditions;
    this.iconNumber = conditions.WeatherIcon;
    this.weatherIcon = `${this.ICON_URL}/${this.ICONS_NAME[this.iconNumber]}`;
    this.temperature = `${conditions?.Temperature?.Metric.Value}${this.DEGREE}C`;
  }

  private setCityName() {
    this.parametersService.getCityName()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((cityName: string) => {
          this.cityName = cityName;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

}
