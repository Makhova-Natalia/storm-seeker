import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { SearchResult, WeatherConditions } from "../models/weather.model";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private searchResult$$: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>({} as SearchResult);
  private currentConditions$$: BehaviorSubject<WeatherConditions> = new BehaviorSubject<WeatherConditions>({} as WeatherConditions);

  readonly API_HOST = environment.API_HOST;
  readonly API_KEY = environment.API_KEY;

  readonly URL_BODIES = {
    autocomplete: 'locations/v1/cities/autocomplete',
    currentWeather: 'currentconditions/v1',
    fiveDaysForecasts: 'forecasts/v1/daily/5day/'
}

  constructor( private readonly http: HttpClient) { }

  setSearchResult(location: SearchResult): void {
    this.searchResult$$.next(location);
  }

  getSearchResult(): Observable<SearchResult> {
    return this.searchResult$$.asObservable();
  }

  setCurrentConditions(conditions: WeatherConditions): void {
    this.currentConditions$$.next(conditions);
  }

  getCurrentConditions(): Observable<WeatherConditions> {
    return this.currentConditions$$.asObservable();
  }

  searchLocation(query: string): Observable<any> {
    return this.http.get(`${this.API_HOST}/${this.URL_BODIES.autocomplete}`, {
      params: { apikey: this.API_KEY, q: query }
    });
  }

  getCurrentWeatherConditions(locationKey: string): Observable<any> {
    return this.http.get(`${this.API_HOST}/${this.URL_BODIES.currentWeather}/${locationKey}`, {
      params: { apikey: this.API_KEY }
    });
  }
}
