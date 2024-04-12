export interface WeatherConditions {
  Temperature: {
    Metric: {
      Value: number,
      Unit: string,
      UnitType: number
    }
  },
  WeatherText: string,
}

export interface SearchResult {
  Key: string;
}
