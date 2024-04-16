import { Injectable } from '@angular/core';
import { DailyForecast, SearchResult, WeatherConditions } from "../models/weather.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  private searchResult$$: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>({} as SearchResult);
  private currentConditions$$: BehaviorSubject<WeatherConditions> = new BehaviorSubject<WeatherConditions>({} as WeatherConditions);
  private cityName$$: BehaviorSubject<string> = new BehaviorSubject<string>('Kiev');
  private isFavorite$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isEmpty$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fiveDaysForecasts$$: BehaviorSubject<DailyForecast[]> = new BehaviorSubject<DailyForecast[]>([]);

  constructor() { }

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

  setIsFavorite(isFav: boolean): void {
    this.isFavorite$$.next(isFav);
  }

  getIsFavorite(): Observable<boolean> {
    return this.isFavorite$$.asObservable();
  }

  setFiveDaysForecasts(forecasts: DailyForecast[]): void {
    this.fiveDaysForecasts$$.next(forecasts);
  }

  getFiveForecasts(): Observable<DailyForecast[]> {
    return this.fiveDaysForecasts$$.asObservable();
  }
}
