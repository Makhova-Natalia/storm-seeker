import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { NgClass } from "@angular/common";
import { WeatherService } from "../../../../core/services/weather.service";
import { FavoriteLocation, SearchResult, WeatherConditions } from "../../../../core/models/weather.model";

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.css'
})
export class AddFavoriteComponent implements OnInit {
  private cityName: string = '';
  private id: string;
  private temperature: number;
  private weatherText: string
  isFavorite: boolean = false;


  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getIsFavorite().subscribe((isFav: boolean) => {
      this.isFavorite = isFav;
    })
    this.weatherService.getCityName().subscribe((city: string) => {
      this.cityName = city;
    });
    this.weatherService.getCurrentForecast().subscribe((weather: WeatherConditions) => {
      this.temperature = weather?.Temperature?.Metric.Value;
      this.weatherText = weather.WeatherText;
    });
    this.weatherService.getSearchResult().subscribe((city: SearchResult) => {
      this.id = city.Key;
    })
  }

  private setFavoriteLocation(): FavoriteLocation {
    return {
      id: this.id,
      cityName: this.cityName,
      temperature: this.temperature,
      weatherText: this.weatherText
    }
  }

  toggleFavorite() {
    this.weatherService.setIsFavorite(!this.isFavorite);


    if (this.isFavorite) {
      this.weatherService.addToFavoriteList(this.setFavoriteLocation());
    } else {
      this.weatherService.removeFromFavoriteList(this.id);
    }
  }

}
