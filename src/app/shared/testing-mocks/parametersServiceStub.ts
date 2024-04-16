import { of } from "rxjs";
import { SearchResultStub } from "./searchResultStub";
import { WeatherConditionsStub } from "./weatherConditionsStub";
import { DailyForecastStub } from "./dailyForecastStub";
import { DailyForecast, SearchResult, WeatherConditions } from "../../core/models/weather.model";

export class ParametersServiceStub {
  setSearchResult = (location: SearchResult) => {}
  getSearchResult = () => of(SearchResultStub)
  setCurrentConditions = (conditions: WeatherConditions) => {}
  getCurrentForecast = () => of(WeatherConditionsStub)
  setCityName = (city: string) => {}
  setIsEmpty = (isEmpty: boolean) => {}
  getIsEmpty = () => of(true);
  getCityName = () => of('')
  setIsFavorite = (isFav: boolean) => {}
  getIsFavorite = () => of(true);
  setFiveDaysForecasts = (forecasts: DailyForecast[]) => {}
  getFiveForecasts = () => of([DailyForecastStub, DailyForecastStub])
}
