import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { SearchResult, WeatherConditions } from "../models/weather.model";
import { URL_BODIES } from "../models/weatherData.config";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private searchResult$$: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>({} as SearchResult);
  private currentConditions$$: BehaviorSubject<WeatherConditions> = new BehaviorSubject<WeatherConditions>({} as WeatherConditions);
  private cachedSearchResult: SearchResult[];
  private cachedCurrentConditions: WeatherConditions[];
  private URLBodies = URL_BODIES;
  private cityName$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  readonly API_HOST = environment.API_HOST;
  readonly API_KEY = environment.API_KEY;

  constructor(private readonly http: HttpClient,
              private localStorage: LocalStorageService) {
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

  getCityName(): Observable<string> {
    return this.cityName$$.asObservable();
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

  searchLocation(query: string): Observable<SearchResult[]> {
    if (environment.production || !this.localStorage.isDataExist(query)) {
      return this.getCityInfo(query)
        .pipe(
          tap((response: SearchResult[]) => {
            this.localStorage.setData(query, response);
          })
        );
    } else {
      return of(this.localStorage.getData(query))
        .pipe(
          map(data => data as SearchResult[])
        );
    }
  }

  getCurrentWeatherConditions(locationKey: string): Observable<WeatherConditions[]> {
    if (environment.production || !this.localStorage.isDataExist(locationKey)) {
      return this.getForecastInfo(locationKey)
        .pipe(
          tap((response: WeatherConditions[]) => {
            this.localStorage.setData(locationKey, response);
          })
        );
    } else {
      return of(this.localStorage.getData(locationKey))
        .pipe(
          map(data => data as WeatherConditions[])
        );
    }
  }
}
