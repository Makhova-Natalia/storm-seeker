import { Component, Input } from '@angular/core';
import { MaterialModule } from "../../../material-module";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { WeatherService } from "../../../core/services/weather.service";
import { DAYS_OF_WEEK } from "../../../core/models/weatherData.config";

@Component({
  selector: 'app-one-day-weather-item',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './one-day-weather-item.component.html',
  styleUrl: './one-day-weather-item.component.css'
})
export class OneDayWeatherItemComponent {
  @Input() imageSrc: string;
  @Input() param: string;
  @Input() temperature: string;
  @Input() weatherInfo: string;
  @Input() allowNavigation: boolean;

  constructor(private router: Router, private weatherService: WeatherService) {
  }

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = DAYS_OF_WEEK;
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
  }

  navigateToHomePage() {
    this.weatherService.setCityName(this.param)
    this.router.navigate(['/home']);
  }
}
