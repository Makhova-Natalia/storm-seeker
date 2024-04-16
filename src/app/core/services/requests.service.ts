import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { FutureForecasts, SearchResult, WeatherConditions } from "../models/weather.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { URL_BODIES } from "../models/weatherData.config";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  readonly API_HOST = environment.API_HOST;
  readonly API_KEY = environment.API_KEY;
  private URLBodies = URL_BODIES;

  constructor(private readonly http: HttpClient) { }

  getCityInfo(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`${this.API_HOST}/${this.URLBodies.autocomplete}`, {
      params: {apikey: this.API_KEY, q: query}
    })
  }

  getForecastInfo(locationKey: string): Observable<WeatherConditions[]> {
    return this.http.get<WeatherConditions[]>(`${this.API_HOST}/${this.URLBodies.currentWeather}/${locationKey}`, {
      params: {apikey: this.API_KEY}
    })
  }

  getFutureForecasts(locationKey: string): Observable<FutureForecasts> {
    return this.http.get<FutureForecasts>(`${this.API_HOST}/${this.URLBodies.fiveDaysForecasts}/${locationKey}`, {
      params: {apikey: this.API_KEY, metric: true}
    })
  }
}
