import { of } from "rxjs";
import { SearchResultStub } from "./searchResultStub";
import { WeatherConditionsStub } from "./weatherConditionsStub";
import { FutureForecastsStub } from "./futureForecastsStub";

export class RequestsServiceStub {
  getCityInfo = () => of([SearchResultStub, SearchResultStub])
  getForecastInfo = () => of([WeatherConditionsStub, WeatherConditionsStub])
  getFutureForecasts = () => of(FutureForecastsStub)
}
