import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "../../../../core/services/weather.service";
import { SearchResult, WeatherConditions } from "../../../../core/models/weather.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent implements OnInit {
  readonly defaultCity: string = 'Kiev';

  searchQuery: string = this.defaultCity;
  searchResult$: Observable<SearchResult>;
  currentConditions$: Observable<WeatherConditions>;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.searchResult$ = this.weatherService.getSearchResult();
    this.currentConditions$ = this.weatherService.getCurrentConditions();

    this.weatherService.searchLocation(this.defaultCity).subscribe(val => {
      this.weatherService.setSearchResult(val[0]);
      this.getWeatherConditions(val[0].Key);
    })
  }

  searchLocation(): void {
    this.weatherService.searchLocation(this.searchQuery).subscribe(val => {
      this.weatherService.setSearchResult(val[0]);
      this.getWeatherConditions(val[0].Key);
    });
  }

  getWeatherConditions(locationKey: string): void {
    this.weatherService.getCurrentWeatherConditions(locationKey).subscribe(val => {
      this.weatherService.setCurrentConditions(val[0]);
    });
  }
}
