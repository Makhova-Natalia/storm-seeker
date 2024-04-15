import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { CommonModule, NgClass } from "@angular/common";
import { WeatherService } from "../../../../core/services/weather.service";
import { FavoriteLocation, SearchResult, WeatherConditions } from "../../../../core/models/weather.model";
import { BehaviorSubject, forkJoin, Observable, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [ MaterialModule, NgClass, CommonModule ],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.css'
})
export class AddFavoriteComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  private cityName: string = '';
  private id: string;
  private temperature: number;
  private weatherText: string;
  private weatherIcon: number;
  private isFavoriteSubject$$: BehaviorSubject<boolean>;
  isFavorite$: Observable<boolean>;


  constructor(private weatherService: WeatherService) {
    this.isFavoriteSubject$$ = new BehaviorSubject<boolean>(this.weatherService.checkFavoriteList(this.setFavoriteLocation().cityName));
    this.isFavorite$ = this.isFavoriteSubject$$.asObservable();
  }

  ngOnInit() {
    this.setIsFavorite();
    this.setForecast();

    this.weatherService.getFavoriteUpdated()
      .pipe(
        takeUntil(this.destroyed$$)
      )
      .subscribe(() => {
        this.isFavoriteSubject$$.next(this.weatherService.checkFavoriteList(this.setFavoriteLocation().cityName));
      })
  }

  private setForecast(): void {
    forkJoin({
      cityName: this.setCityName(),
      currentForecast: this.setCurrentForecast(),
      id: this.setId()
    }).pipe(
      takeUntil(this.destroyed$$)
    ).subscribe();
  }

  private setFavoriteLocation(): FavoriteLocation {
    return {
      id: this.id,
      cityName: this.cityName,
      temperature: this.temperature,
      weatherText: this.weatherText,
      weatherIcon: this.weatherIcon
    }
  }

  private setCityName(): Observable<string> {
    return this.weatherService.getCityName()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((city: string) => {
          this.cityName = city;
        })
      )
  }

  private setIsFavorite(): void {
    this.weatherService.getIsFavorite()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((isFav: boolean) => {
          this.isFavoriteSubject$$.next(isFav);
        })
      )
      .subscribe();
  }

  private setCurrentForecast(): Observable<WeatherConditions> {
    return this.weatherService.getCurrentForecast()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((weather: WeatherConditions) => {
          this.temperature = weather?.Temperature?.Metric.Value;
          this.weatherText = weather.WeatherText;
          this.weatherIcon = weather.WeatherIcon;
        })
      )
  }

  private setId(): Observable<SearchResult> {
    return this.weatherService.getSearchResult()
      .pipe(
        takeUntil(this.destroyed$$),
        tap((city: SearchResult) => {
          this.id = city.Key;
        })
      )
  }

  toggleFavorite() {
    this.weatherService.setIsFavorite(!this.isFavoriteSubject$$.value);

    if (this.isFavoriteSubject$$.value) {
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
