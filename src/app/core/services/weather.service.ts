import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { SearchResult, WeatherConditions } from "../models/weather.model";
import { URL_BODIES } from "../models/weatherData.config";


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

  constructor(private readonly http: HttpClient) {
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

  searchLocation(query: string): Observable<SearchResult[]> {
    if (!environment.production || !this.cachedSearchResult) {
      return this.http.get<SearchResult[]>(`${this.API_HOST}/${this.URLBodies.autocomplete}`, {
        params: {apikey: this.API_KEY, q: query}
      })
        .pipe(
          tap((response: SearchResult[]) => {
            this.cachedSearchResult = response;
          })
        );
    } else {
      return of(this.cachedSearchResult);
    }
  }

  getCurrentWeatherConditions(locationKey: string): Observable<WeatherConditions[]> {
    if (!environment.production || !this.cachedCurrentConditions) {
      return this.http.get<WeatherConditions[]>(`${this.API_HOST}/${this.URLBodies.currentWeather}/${locationKey}`, {
        params: {apikey: this.API_KEY}
      })
        .pipe(
          tap((response: WeatherConditions[]) => {
            this.cachedCurrentConditions = response;
          })
        );
    } else {
      return of(this.cachedCurrentConditions);
    }
  }
}
