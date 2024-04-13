import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "../../../../core/services/weather.service";
import { SearchResult, WeatherConditions } from "../../../../core/models/weather.model";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent implements OnInit, OnDestroy {
  readonly defaultCity: string = 'Kiev';
  private destroyed$$: Subject<void> = new Subject<void>();

  cityName: string = this.defaultCity;
  // searchResult$: Observable<SearchResult>;
  // currentConditions$: Observable<WeatherConditions>;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    // this.searchResult$ = this.weatherService.getSearchResult();
    // this.currentConditions$ = this.weatherService.getCurrentConditions();

    this.fetchWeatherData(this.defaultCity);
  }

  private fetchWeatherData(cityName: string): void {
    this.weatherService.searchLocation(cityName)
      .pipe(
        takeUntil(this.destroyed$$)
      )
      .subscribe(val => {
      this.weatherService.setSearchResult(val[0]);
      this.getWeatherConditions(val[0].Key);
    })
  }

  searchLocation(): void {
    this.fetchWeatherData(this.cityName);
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
