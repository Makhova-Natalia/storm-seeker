import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { NgClass } from "@angular/common";
import { WeatherService } from "../../../../core/services/weather.service";
import { FavoriteLocation, SearchResult, WeatherConditions } from "../../../../core/models/weather.model";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.css'
})
export class AddFavoriteComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  private cityName: string = '';
  private id: string;
  private temperature: number;
  private weatherText: string
  isFavorite: boolean = false;


  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.setIsFavorite();
    this.setForecast();

    this.weatherService.getFavoriteUpdated().subscribe(() => {
      this.isFavorite = this.weatherService.checkFavoriteList(this.setFavoriteLocation());
      console.log(this.isFavorite)
    })
  }

  private setForecast(): void {
    this.setCityName();
    this.setCurrentForecast();
    this.setId();
  }

  private setFavoriteLocation(): FavoriteLocation {
    return {
      id: this.id,
      cityName: this.cityName,
      temperature: this.temperature,
      weatherText: this.weatherText
    }
  }

  private setCityName(): void {
    this.weatherService.getCityName()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((city: string) => {
          this.cityName = city;
        })
      )
      .subscribe();
  }

  private setIsFavorite(): void {
    this.weatherService.getIsFavorite()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((isFav: boolean) => {
          this.isFavorite = isFav;
        })
      )
      .subscribe();
  }

  private setCurrentForecast(): void {
    this.weatherService.getCurrentForecast()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((weather: WeatherConditions) => {
          this.temperature = weather?.Temperature?.Metric.Value;
          this.weatherText = weather.WeatherText;
        })
      )
      .subscribe();
  }

  private setId(): void {
    this.weatherService.getSearchResult()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((city: SearchResult) => {
          this.id = city.Key;
        })
      )
      .subscribe()
  }

  toggleFavorite() {
    this.weatherService.setIsFavorite(!this.isFavorite);

    if (this.isFavorite) {
      this.weatherService.addToFavoriteList(this.setFavoriteLocation());
    } else {
      this.weatherService.removeFromFavoriteList(this.id);
    }
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

}
