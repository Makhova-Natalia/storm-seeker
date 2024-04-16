import { of } from "rxjs";
import { FavoriteLocationStub } from "./favoriteLocationStub";
import { FavoriteLocation } from "../../core/models/weather.model";
import { SearchResultStub } from "./searchResultStub";
import { FutureForecastsStub } from "./futureForecastsStub";
import { WeatherConditionsStub } from "./weatherConditionsStub";

export class WeatherServiceStub {
  getFavoriteUpdated = () => of()
  getFavoritesList = () => of([FavoriteLocationStub, FavoriteLocationStub])
  addToFavoriteList = (location: FavoriteLocation) => {}
  checkFavoriteList = (cityName: string) => true
  removeFromFavoriteList = (id: string) => {}
  searchLocation = (query: string) => of([SearchResultStub, SearchResultStub])
  getFiveDaysForecasts= (locationKey: string) => of(FutureForecastsStub)
  getCurrentWeatherConditions= (locationKey: string) => of([WeatherConditionsStub, WeatherConditionsStub])
}
