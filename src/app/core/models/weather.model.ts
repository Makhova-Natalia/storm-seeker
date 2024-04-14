export interface WeatherConditions {
  Temperature: {
    Metric: {
      Value: number,
      // Unit: string,
      UnitType: number
    }
  },
  WeatherText: string,
  WeatherIcon: number,
}

export interface SearchResult {
  Key: string
}

export interface FavoriteLocation {
  id: string,
  cityName: string,
  temperature: number,
  weatherText: string
}

export interface DailyForecast {
  Date: string,
  Temperature: {
    Maximum: {
      Value: number,
      UnitType: number
    }
  },
  Day: {
    IconPhrase: string,
  },
}

export interface FutureForecasts {
  DailyForecasts: DailyForecast[]
}
