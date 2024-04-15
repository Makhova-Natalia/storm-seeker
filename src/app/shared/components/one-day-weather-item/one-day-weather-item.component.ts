import { Component, Input } from '@angular/core';
import { MaterialModule } from "../../../material-module";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DAYS_OF_WEEK } from "../../../core/models/weatherData.config";
import { ParametersService } from "../../../core/services/parameters.service";

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

  constructor(
    private router: Router,
    private parametersService: ParametersService
  ) {}

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = DAYS_OF_WEEK;
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
  }

  navigateToHomePage() {
    this.parametersService.setCityName(this.param)
    this.router.navigate(['/home']);
  }
}
