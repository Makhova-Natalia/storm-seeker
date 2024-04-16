import { of } from "rxjs";
import { SearchResultStub } from "./searchResultStub";
import { WeatherConditionsStub } from "./weatherConditionsStub";
import { DailyForecastStub } from "./dailyForecastStub";

export class ParametersServiceStub {
  setSearchResult = (location: SearchResultStub) => {}
  getSearchResult = () => of(SearchResultStub)
  setCurrentConditions = (conditions: WeatherConditionsStub) => {}
  getCurrentForecast = () => of(WeatherConditionsStub)
  setCityName = (city: string) => {}
  setIsEmpty = (isEmpty: boolean) => {}
  getIsEmpty = () => of(true);
  getCityName = () => of('')
  setIsFavorite = (isFav: boolean) => {}
  getIsFavorite = () => of(true);
  setFiveDaysForecasts = (forecasts: DailyForecastStub[]) => {}
  getFiveForecasts = () => of([DailyForecastStub, DailyForecastStub])
}
