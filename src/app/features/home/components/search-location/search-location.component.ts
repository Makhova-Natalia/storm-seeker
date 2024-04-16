import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "../../../../core/services/weather.service";
import { Subject, takeUntil, tap } from "rxjs";
import { SearchResult } from "../../../../core/models/weather.model";
import { LoadingService } from "../../../../core/services/loading.service";
import { englishPattern } from "../../../../core/models/weatherData.config";
import { ParametersService } from "../../../../core/services/parameters.service";

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  englishPattern: RegExp = englishPattern;

  cityName: string = '';

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService,
    private parametersService: ParametersService
  ) {
  }

  ngOnInit() {
    this.parametersService.getCityName()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((city: string) => {
          this.cityName = city;
        })
      )
      .subscribe();

    this.fetchWeatherData(this.cityName);
  }

  private fetchWeatherData(cityName: string): void {
    this.weatherService.searchLocation(cityName)
      .pipe(
        takeUntil(this.destroyed$$),
        tap((val: SearchResult[]) => {
          if (!val.length) {
            this.loadingService.setLoading(false);
            this.parametersService.setIsEmpty(true);
          } else {
            this.parametersService.setIsEmpty(false);
            this.parametersService.setSearchResult(val[0]);
            this.getWeatherConditions(val[0].Key);
            this.loadingService.setLoading(false);
          }
        })
      )
      .subscribe(() => {
        this.parametersService.setCityName(this.cityName);
      })
  }

  searchLocation(): void {
    if(!this.englishPattern.test(this.cityName)) return;
    this.fetchWeatherData(this.cityName);
    this.parametersService.setIsFavorite(this.weatherService.checkFavoriteList(this.cityName));
  }

  getWeatherConditions(locationKey: string): void {
    this.weatherService.getCurrentWeatherConditions(locationKey)
      .pipe(
        takeUntil(this.destroyed$$)
      )
      .subscribe(val => {
        this.parametersService.setCurrentConditions(val[0]);
      });
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
