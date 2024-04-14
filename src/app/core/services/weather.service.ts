import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { FavoriteLocation, SearchResult, WeatherConditions } from "../models/weather.model";
import { URL_BODIES } from "../models/weatherData.config";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private searchResult$$: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>({} as SearchResult);
  private currentConditions$$: BehaviorSubject<WeatherConditions> = new BehaviorSubject<WeatherConditions>({} as WeatherConditions);
  private URLBodies = URL_BODIES;
  private cityName$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private favoritesList$$: BehaviorSubject<FavoriteLocation[]> = new BehaviorSubject<FavoriteLocation[]>([]);
  private isFavorite$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isEmpty$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private favoriteUpdated$$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);


  readonly API_HOST = environment.API_HOST;
  readonly API_KEY = environment.API_KEY;

  constructor(private readonly http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  setSearchResult(location: SearchResult): void {
    this.searchResult$$.next(location);
  }

  getSearchResult(): Observable<SearchResult> {
    return this.searchResult$$.asObservable();
  }

  setCurrentConditions(conditions: WeatherConditions): void {
    this.currentConditions$$.next(conditions);
  }

  getCurrentForecast(): Observable<WeatherConditions> {
    return this.currentConditions$$.asObservable();
  }

  setCityName(cityName: string): void {
    this.cityName$$.next(cityName);
  }

  setIsEmpty(isEmpty: boolean): void {
    this.isEmpty$$.next(isEmpty);
  }

  getIsEmpty(): Observable<boolean> {
    return this.isEmpty$$.asObservable();
  }

  getCityName(): Observable<string> {
    return this.cityName$$.asObservable();
  }

  setIsFavorite(isFav: boolean) {
    this.isFavorite$$.next(isFav);
  }

  getIsFavorite(): Observable<boolean> {
    return this.isFavorite$$.asObservable();
  }

  getFavoriteUpdated(): Observable<void> {
    return this.favoriteUpdated$$.asObservable();
  }

  private getCityInfo(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`${this.API_HOST}/${this.URLBodies.autocomplete}`, {
      params: {apikey: this.API_KEY, q: query}
    })
  }

  private getForecastInfo(locationKey: string): Observable<WeatherConditions[]> {
    return this.http.get<WeatherConditions[]>(`${this.API_HOST}/${this.URLBodies.currentWeather}/${locationKey}`, {
      params: {apikey: this.API_KEY}
    })
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

  checkFavoriteList(location: FavoriteLocation): boolean {
    const favorites = this.localStorageService.getData('favorites');

    if(favorites) {
      return favorites.some((fav: FavoriteLocation) => fav.id === location.id);
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
    if (environment.production) {
      return this.getCityInfo(query);
    } else if (!this.localStorageService.isDataExist(query)) {
      return this.getCityInfo(query)
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

  getCurrentWeatherConditions(locationKey: string): Observable<WeatherConditions[]> {
    this.favoriteUpdated$$.next();
    if (environment.production) {
      return this.getForecastInfo(locationKey);
    } else if (!this.localStorageService.isDataExist(locationKey)) {
      return this.getForecastInfo(locationKey)
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
