export interface WeatherConditions {
  Temperature: {
    Metric: {
      Value: number,
      Unit: string,
      UnitType: number
    }
  },
  WeatherText: string,
  WeatherIcon: number,
}

export interface SearchResult {
  Key: string;
}
