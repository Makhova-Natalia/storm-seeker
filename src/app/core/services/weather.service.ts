import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  FavoriteLocation,
  FutureForecasts,
  SearchResult,
  WeatherConditions
} from "../models/weather.model";
import { LocalStorageService } from "./local-storage.service";
import { RequestsService } from "./requests.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private favoritesList$$: BehaviorSubject<FavoriteLocation[]> = new BehaviorSubject<FavoriteLocation[]>([]);
  private favoriteUpdated$$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private readonly http: HttpClient,
              private localStorageService: LocalStorageService,
              private requests: RequestsService
  ) {}


  getFavoriteUpdated(): Observable<void> {
    return this.favoriteUpdated$$.asObservable();
  }

  getFavoritesList(): Observable<FavoriteLocation[]> {
    return this.favoritesList$$.asObservable();
  }

  getFavoritesListFromStorage():FavoriteLocation[] {
    return this.localStorageService.getData('favorites')
  }

  addToFavoriteList(location: FavoriteLocation): void {
    const favorites = this.favoritesList$$.value;
    const isIncludedCity = favorites.some(favorite => favorite.id === location.id);

    if (!isIncludedCity) {
      favorites.push(location);
      this.favoritesList$$.next(favorites);
      this.localStorageService.setData('favorites', favorites);
      this.favoriteUpdated$$.next();
    }
  }

  checkFavoriteList(cityName: string): boolean {
    const favorites = this.localStorageService.getData('favorites');

    if(favorites) {
      return favorites.some((fav: FavoriteLocation) => fav.cityName === cityName);
    }

    return false
  }

  removeFromFavoriteList(id: string): void {
    const favorites = this.favoritesList$$.value;
    const indexToRemove = favorites.findIndex(element => element.id === id);

    if (indexToRemove !== -1) {
      favorites.splice(indexToRemove, 1);
      this.favoritesList$$.next(favorites);
      this.localStorageService.setData('favorites', favorites);
      this.favoriteUpdated$$.next();
    }
  }

  searchLocation(query: string): Observable<SearchResult[]> {
    this.favoriteUpdated$$.next();
    if (environment.production) {
      return this.requests.getCityInfo(query);
    } else if (!this.localStorageService.isDataExist(query)) {
      return this.requests.getCityInfo(query)
        .pipe(
          tap((response: SearchResult[]) => {
            this.localStorageService.setData(query, response);
          })
        );
    } else {
      return of(this.localStorageService.getData(query))
        .pipe(
          map(data => data as SearchResult[])
        );
    }
  }

  getFiveDaysForecasts(locationKey: string): Observable<FutureForecasts> {
    if (environment.production) {
      return this.requests.getFutureForecasts(locationKey);
    } else if (!this.localStorageService.isDataExist(`${locationKey}_5Days`)) {
      return this.requests.getFutureForecasts(locationKey)
        .pipe(
          tap((response: FutureForecasts) => {
            this.localStorageService.setData(`${locationKey}_5Days`, response);
          })
        );
    } else {
      return of(this.localStorageService.getData(`${locationKey}_5Days`))
        .pipe(
          map(data => data as FutureForecasts)
        );
    }
  }

  getCurrentWeatherConditions(locationKey: string): Observable<WeatherConditions[]> {
    if (environment.production) {
      return this.requests.getForecastInfo(locationKey);
    } else if (!this.localStorageService.isDataExist(locationKey)) {
      return this.requests.getForecastInfo(locationKey)
        .pipe(
          tap((response: WeatherConditions[]) => {
            this.localStorageService.setData(locationKey, response);
          })
        );
    } else {
      return of(this.localStorageService.getData(locationKey))
        .pipe(
          map(data => data as WeatherConditions[])
        );
    }
  }
}
