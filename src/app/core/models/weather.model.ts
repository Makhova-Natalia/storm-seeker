export interface WeatherConditions {
  Temperature: {
    Metric: {
      Value: number,
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
  weatherText: string,
  weatherIcon: number,
}

export interface DailyForecast {
  Date: string,
  Temperature: {
    Maximum: {
      Value: string,
      UnitType: number
    },
    Minimum: {
      Value: string,
    }
  },
  Day: {
    Icon: number,
  },
}

export interface FutureForecasts {
  DailyForecasts: DailyForecast[]
}
