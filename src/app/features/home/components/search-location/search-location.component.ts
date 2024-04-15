import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "../../../../core/services/weather.service";
import { Subject, takeUntil, tap } from "rxjs";
import { SearchResult } from "../../../../core/models/weather.model";

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();

  cityName: string = '';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getCityName()
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
            this.weatherService.setIsEmpty(true);
          } else {
            this.weatherService.setIsEmpty(false);
            this.weatherService.setSearchResult(val[0]);
            this.getWeatherConditions(val[0].Key);
          }
        })
      )
      .subscribe(val => {
      })
    this.weatherService.setCityName(this.cityName);
  }

  searchLocation(): void {
    this.fetchWeatherData(this.cityName);
    this.weatherService.setIsFavorite(this.weatherService.checkFavoriteList(this.cityName));
  }

  getWeatherConditions(locationKey: string): void {
    this.weatherService.getCurrentWeatherConditions(locationKey)
      .pipe(
        takeUntil(this.destroyed$$)
      )
      .subscribe(val => {
        this.weatherService.setCurrentConditions(val[0]);
      });
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
